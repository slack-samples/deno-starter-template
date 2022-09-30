import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in Workflows.
 * https://api.slack.com/future/functions/custom
 */
export const SampleFunctionDefinition = DefineFunction({
  callback_id: "sample_function",
  title: "Sample function",
  description: "A sample function",
  source_file: "functions/sample_function.ts",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Message to be posted",
      },
      user: {
        type: Schema.slack.types.user_id,
        description: "The user invoking the workflow",
      },
    },
    required: ["message"],
  },
  output_parameters: {
    properties: {
      updatedMsg: {
        type: Schema.types.string,
        description: "Updated message to be posted",
      },
    },
    required: ["updatedMsg"],
  },
});

// This function takes the input from the open form step, adds formatting, saves our
// updated object into the Slack hosted Datastore, and returns the updated message.
export default SlackFunction(
  SampleFunctionDefinition,
  async ({ inputs, token }) => {
    const client = SlackAPI(token, {});
    const sampleObject = {} as Record<string, unknown>;
    const uuid = crypto.randomUUID();
    sampleObject.original_msg = inputs.message;

    // inputs.user is set from the interactivity_context defined in sample_trigger.ts
    // https://api.slack.com/future/forms#add-interactivity
    const updatedMsg = `:wave: ` + `<@${inputs.user}>` +
      ` submitted the following message: \n\n>${inputs.message}`;
    sampleObject.updated_msg = updatedMsg;

    //set unique object id, this will be our primary key in the Datastore
    sampleObject.object_id = "OBJ-" + uuid;

    // Save the sample object to the datastore
    // https://api.slack.com/future/datastores
    await client.apps.datastore.put(
      {
        datastore: "SampleObjects",
        item: sampleObject,
      },
    );

    return { outputs: { updatedMsg } };
  },
);
