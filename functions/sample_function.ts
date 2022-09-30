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
    const sampleObject = {} as Record<string, unknown>;
    sampleObject.original_msg = inputs.message;

    // inputs.user is set from the interactivity_context we defined in sample_trigger.ts
    // More info on interactivity here: https://api.slack.com/future/forms#add-interactivity
    const updatedMsg = `:wave: ` + `<@${inputs.user}>` +
      ` submitted the following message: \n\n>${inputs.message}`;
    sampleObject.updated_msg = updatedMsg;

    //initialize SlackAPI so we can use the Slack hosted Datastore
    const client = SlackAPI(token, {});

    //set unique object id, this will be our primary key in the Datastore
    sampleObject.object_id = "OBJ-" +
      await (Math.floor(100000 + Math.random() * 900000));

    //save the sample object by calling datastore.put: https://api.slack.com/future/datastores#put
    await client.apps.datastore.put(
      {
        datastore: "SampleObjects",
        item: sampleObject,
      },
    );

    return { outputs: { updatedMsg } };
  },
);
