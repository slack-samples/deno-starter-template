import { Trigger } from "deno-slack-api/types.ts";

const sampleTrigger: Trigger = {
  type: "shortcut",
  name: "Sample trigger",
  description: "A sample trigger for demonstration",
  workflow: "#/workflows/sample_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default sampleTrigger;
