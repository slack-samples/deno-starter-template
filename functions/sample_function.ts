import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

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
  }
});

export default SlackFunction(
  SampleFunctionDefinition,
  ({ inputs }) => {
    const { message } = inputs;
    const updatedMsg =
      `:wave: You submitted the following message: \n\n>${message}`;
    return { outputs: { updatedMsg } };
  },
);
