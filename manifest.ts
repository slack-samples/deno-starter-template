import { Manifest } from "deno-slack-sdk/mod.ts";
import SampleFunction from "./functions/sample-function/sample_definition.ts";
import SampleWorkflow from "./workflows/sample_workflow.ts";

export default Manifest({
  name: "deno-starter-template",
  description: "A template for building Slack apps with Deno",
  icon: "assets/icon.png",
  functions: [SampleFunction],
  workflows: [SampleWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public", "triggers:write"],
});
