import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import {
  assertEquals,
  assertExists,
  assertStringIncludes,
} from "std/testing/asserts.ts";
import SampleFunction from "./sample_function.ts";
import * as mf from "mock-fetch/mod.ts";

const { createContext } = SlackFunctionTester("sample_function");

// Replaces globalThis.fetch with the mocked copy
mf.install();

// Shared mocks can be defined at the top level of tests
mf.mock("POST@/api/apps.datastore.put", async (args) => {
  const body = await args.formData();
  const datastore = body.get("datastore");
  const item = body.get("item");

  return new Response(
    `{"ok": true, "datastore": "${datastore}", "item": ${item}}`,
    {
      status: 200,
    },
  );
});

Deno.test("Sample function test", async () => {
  const inputs = { message: "Hello, World!", user: "U01234567" };
  const { outputs, error } = await SampleFunction(createContext({ inputs }));

  assertEquals(error, undefined);
  assertEquals(
    outputs?.updatedMsg,
    ":wave: <@U01234567> submitted the following message: \n\n>Hello, World!",
  );
});

Deno.test("Sample function datastore error handling", async () => {
  // Mocks specific to a test can be overriden within a test
  mf.mock("POST@/api/apps.datastore.put", () => {
    return new Response(`{"ok": false, "error": "datastore_error"}`, {
      status: 200,
    });
  });

  const inputs = { message: "Hello, World!", user: "U01234567" };
  const { outputs, error } = await SampleFunction(createContext({ inputs }));

  assertExists(error);
  assertStringIncludes(error, "datastore_error");
  assertEquals(outputs, undefined);
});
