import { Trigger } from "deno-slack-sdk/types.ts";
import SampleWorkflow from "../workflows/sample_workflow.ts";
/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const sampleTrigger: Trigger<typeof SampleWorkflow.definition> = {
  type: "shortcut",
  name: "Sample trigger",
  description: "A sample trigger",
  workflow: "#/workflows/sample_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
    user: {
      value: "{{data.user_id}}",
    },
  },
};

export default sampleTrigger;
