import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

const SampleFunction = DefineFunction({
  callback_id: "sample_function",
  title: "Sample function",
  description: "A sample function for demonstration",
  source_file: "functions/sample-function/sample_function.ts",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: `Message to be posted`,
      },
    },
    required: ["message"],
  },
  output_parameters: {
    properties: {
      updatedMsg: {
        type: Schema.types.string,
        description: `Updated message to be posted`,
      },
    },
    required: ["updatedMsg"],
  },
});

export default SampleFunction;
