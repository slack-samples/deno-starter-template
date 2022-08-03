import {
  DefineFunction,
  DefineWorkflow,
  Manifest,
  Schema,
} from "deno-slack-sdk/mod.ts";

export default Manifest({
  name: "starter-template",
  description: "A starter template.",
  icon: "assets/icon.png",
  functions: [],
  workflows: [],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
