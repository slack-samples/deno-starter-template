import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals, assertExists, assertStringIncludes } from "@std/assert";
import { stub } from "@std/testing/mock";
import SampleFunction from "./sample_function.ts";

const { createContext } = SlackFunctionTester("sample_function");

Deno.test("Sample function test", async () => {
  // Replaces globalThis.fetch with the mocked copy
  using _stubFetch = stub(
    globalThis,
    "fetch",
    async (url: string | URL | Request, options?: RequestInit) => {
      const request = url instanceof Request ? url : new Request(url, options);

      assertEquals(request.method, "POST");
      assertEquals(request.url, "https://slack.com/api/apps.datastore.put");

      const body = await request.formData();
      const datastore = body.get("datastore");
      const item = body.get("item");

      return new Response(
        `{"ok": true, "datastore": "${datastore}", "item": ${item}}`,
        {
          status: 200,
        },
      );
    },
  );
  const inputs = { message: "Hello, World!", user: "U01234567" };
  const { outputs, error } = await SampleFunction(createContext({ inputs }));

  assertEquals(error, undefined);
  assertEquals(
    outputs?.updatedMsg,
    ":wave: <@U01234567> submitted the following message: \n\n>Hello, World!",
  );
});

Deno.test("Sample function datastore error handling", async () => {
  // Replaces globalThis.fetch with the mocked copy
  using _stubFetch = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request, options?: RequestInit) => {
      const request = url instanceof Request ? url : new Request(url, options);

      assertEquals(request.method, "POST");
      assertEquals(request.url, "https://slack.com/api/apps.datastore.put");

      return Promise.resolve(
        new Response(`{"ok": false, "error": "datastore_error"}`, {
          status: 200,
        }),
      );
    },
  );

  const inputs = { message: "Hello, World!", user: "U01234567" };
  const { outputs, error } = await SampleFunction(createContext({ inputs }));

  assertExists(error);
  assertStringIncludes(error, "datastore_error");
  assertEquals(outputs, undefined);
});
