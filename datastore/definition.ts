import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

const SampleObject = DefineDatastore({
  name: "SampleObjects",
  primary_key: "object_id",
  attributes: {
    object_id: {
      type: Schema.types.string,
    },
    original_msg: {
      type: Schema.types.string,
    },
    updated_msg: {
      type: Schema.types.string,
    },
  },
});

export { SampleObject };
