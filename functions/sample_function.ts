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

export default SlackFunction(
  SampleFunctionDefinition,
  ({ inputs, token }) => {
    const sampleObject = {} as Record<string, unknown>;
    sampleObject.original_msg = inputs.message;

    //grab the current user via interactivity, and output that in the
    const updatedMsg = `:wave: ` + `<@${inputs.user}>` +
      ` submitted the following message: \n\n>${inputs.message}`;
    sampleObject.updated_msg = updatedMsg;
    const client = SlackAPI(token, {});
    sampleObject.object_id = "OBJ-" +
      (Math.floor(100000 + Math.random() * 900000));

    //save the sample Object
    client.apps.datastore.put(
      {
        datastore: "SampleObjects",
        item: sampleObject,
      },
    );

    return { outputs: { updatedMsg } };
  },
);
