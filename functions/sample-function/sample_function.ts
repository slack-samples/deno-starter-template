import type { SlackFunctionHandler } from "deno-slack-sdk/types.ts";
import type SampleFunction from "./sample_definition.ts";

const sampleFunction: SlackFunctionHandler<
  typeof SampleFunction.definition
> = (
  { inputs },
) => {
  const { message } = inputs;
  const updatedMsg =
    `:wave: You submitted the following message: \n\n>${message}`;
  return { outputs: { updatedMsg } };
};

export default sampleFunction;
