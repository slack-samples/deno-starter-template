import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import SampleFunction from "../functions/sample-function/sample_definition.ts";

const SampleWorkflow = DefineWorkflow({
  callback_id: "sample_workflow",
  title: "Sample workflow",
  description: "A sample workflow for demonstration",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

const inputForm = SampleWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Send a message to channel",
    interactivity: SampleWorkflow.inputs.interactivity,
    submit_label: "Send message",
    fields: {
      elements: [{
        name: "channel",
        title: "Channel to send message to",
        type: Schema.slack.types.channel_id,
      }, {
        name: "message",
        title: "Message to recipient",
        type: Schema.types.string,
      }],
      required: ["channel", "message"],
    },
  },
);

const sampleFunctionStep = SampleWorkflow.addStep(SampleFunction, {
  message: inputForm.outputs.fields.message,
});

SampleWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: inputForm.outputs.fields.channel,
  message: [{
    type: "section",
    text: {
      type: "mrkdwn",
      text: sampleFunctionStep.outputs.updatedMsg,
    },
  }],
});

export default SampleWorkflow;
