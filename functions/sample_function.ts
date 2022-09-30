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

// This function takes the input from the open form step, adds some formatting
// and returns the updated message. The updated message is the input to a
// sendMessage call, which posts this updated message into the channel the user selected.
// This function also calls the Slack hosted datastore to save our object to
// our datastore once we update it with details such as an object id.
export default SlackFunction(
  SampleFunctionDefinition,
  async ({ inputs, token }) => {
    const sampleObject = {} as Record<string, unknown>;
    sampleObject.original_msg = inputs.message;

    //grab the current user via interactivity, and output that in the message
    const updatedMsg = `:wave: ` + `<@${inputs.user}>` +
      ` submitted the following message: \n\n>${inputs.message}`;
    sampleObject.updated_msg = updatedMsg;
    const client = SlackAPI(token, {});
    sampleObject.object_id = "OBJ-" +
      await (Math.floor(100000 + Math.random() * 900000));

    //save the sample Object
    await client.apps.datastore.put(
      {
        datastore: "SampleObjects",
        item: sampleObject,
      },
    );

    return { outputs: { updatedMsg } };
  },
);
