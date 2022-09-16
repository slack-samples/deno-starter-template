import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

/**
 * Datastores are a Slack-hosted location to store and retrieve
 * data for your next-generation apps.
 * https://api.slack.com/future/datastores
 */
const SampleDatastore = DefineDatastore({
  name: "sample_datastore",
  primary_key: "id",
  attributes: {
    id: {
      type: Schema.types.string,
    },
  },
});

export default SampleDatastore;
