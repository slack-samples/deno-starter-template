import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import SampleFunction from "./sample_function.ts";

const { createContext } = SlackFunctionTester("sample_function");

Deno.test("Sample function test", async () => {
  const inputs = { message: "Hello, World!", user: "U01234567" };
  const { outputs } = await SampleFunction(createContext({ inputs }));
  await assertEquals(
    outputs?.updatedMsg,
    ":wave: <@U01234567> submitted the following message: \n\n>Hello, World!",
  );
});
