import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

const SampleObject = DefineDatastore({
  name: "SampleObjects",
  primary_key: "object_id",
  attributes: {
    object_id: {
      type: Schema.types.string,
    },
    originalMsg: {
      type: Schema.types.string,
    },
    updatedMsg: {
      type: Schema.types.string,
    },
  },
});

export { SampleObject };
