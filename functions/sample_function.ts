import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import type { SlackFunctionHandler } from "deno-slack-sdk/types.ts";
import { saveNewObject } from "../datastore/save_object.ts";
import type { SampleObject } from "../types/sample_object.ts";

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

const sampleFunction: SlackFunctionHandler<
  typeof SampleFunctionDefinition.definition
> = async (
  { inputs, token },
) => {
  const { message } = inputs;
  const sampleObj = <SampleObject> message;
  sampleObj.original_msg = message;
  const updatedMsg =
    `:wave: You submitted the following message: \n\n>${message}`;
  sampleObj.updated_msg = updatedMsg;
  await saveNewObject(token, sampleObj);
  return await { outputs: { updatedMsg } };
};

export default sampleFunction;
