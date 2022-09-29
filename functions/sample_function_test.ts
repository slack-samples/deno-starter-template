import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import SampleFunction from "./sample_function.ts";
// import { SlackAPI } from "deno-slack-api/mod.ts";
import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";

// Replaces globalThis.fetch with the mocked copy
mf.install();

mf.mock("POST@/api/auth.test", async (req: any) => {
  const body = await req.formData();
  console.log(body);
  return body;
});

mf.mock("POST@/api/apps.datastore.put", async (req: any) => {
  const body = await req.formData();
  console.log(body);
  return body;
});

const { createContext } = SlackFunctionTester("sample_function");

Deno.test("Sample function test", async () => {
  const inputs = { message: "Hello, World!" };
  const { outputs } = await SampleFunction(createContext({ inputs }));
  assertEquals(
    outputs?.updatedMsg,
    ":wave: You submitted the following message: \n\n>Hello, World!",
  );
});
