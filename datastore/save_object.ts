import { SlackAPI } from "deno-slack-api/mod.ts";
import type { SampleObject } from "./../types/sample_object.ts";

const saveNewObject = async (token: string, sampleObject: SampleObject) => {
  const client = SlackAPI(token, {});

  //assign a random object_id
  sampleObject.object_id = "OBJ-" +
    (Math.floor(100000 + Math.random() * 900000)); //build in incident increment logic or something here at some point. Pull prefix from env and starting number maybe

  //save the sample Object
  const response = await client.apps.datastore.put(
    {
      datastore: "Sample Objects",
      item: sampleObject,
    },
  );

  if (!response.ok) {
    console.log("Error calling apps.datastore.put:");
    return {
      error: response.error,
    };
  } else {
    console.log("Datastore put successful!");
    return response.item;
  }
};

export { saveNewObject };
