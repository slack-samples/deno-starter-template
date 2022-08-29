import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";
import type { SlackFunctionHandler } from "deno-slack-sdk/types.ts";

const SampleFunctionDefinition = DefineFunction({
  callback_id: "sample_function",
  title: "Sample function",
  description: "A sample function for demonstration",
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

const SampleFunction: SlackFunctionHandler<
  typeof SampleFunctionDefinition.definition
> = (
  { inputs },
) => {
  const { message } = inputs;
  const updatedMsg =
    `:wave: You submitted the following message: \n\n>${message}`;
  return { outputs: { updatedMsg } };
};

export { SampleFunction, SampleFunctionDefinition };
