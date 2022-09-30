import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import SampleFunction from "./sample_function.ts";
import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";

const { createContext } = SlackFunctionTester("sample_function");

// Replaces globalThis.fetch with the mocked copy
mf.install();

mf.mock("POST@/api/apps.datastore.put", () => {
  return new Response(
    `{"ok": true, "item": {"object_id": "d908f8bd-00c6-43f0-9fc3-4da3c2746e14"}}`,
    {
      status: 200,
    },
  );
});

Deno.test("Sample function test", async () => {
  const inputs = { message: "Hello, World!", user: "U01234567" };
  const { outputs } = await SampleFunction(createContext({ inputs }));
  await assertEquals(
    outputs?.updatedMsg,
    ":wave: <@U01234567> submitted the following message: \n\n>Hello, World!",
  );
});
