import { Trigger } from "deno-slack-api/types.ts";
import SampleWorkflow from "../workflows/sample_workflow.ts";
/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
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
    user: {
      value: "{{data.user_id}}",
    },
  },
};

export default sampleTrigger;
