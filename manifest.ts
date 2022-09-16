import { Manifest } from "deno-slack-sdk/mod.ts";
import SampleWorkflow from "./workflows/sample_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "deno-starter-template",
  description: "A template for building Slack apps with Deno",
  icon: "assets/icon.png",
  workflows: [SampleWorkflow],
  outgoingDomains: [],
  // datastores: [SampleDatastore], 
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
