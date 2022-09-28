import { SlackAPI } from "deno-slack-api/mod.ts";
import type { SampleObject } from "./../types/sample_object.ts";

//This function saves an object into the datastore, and returns the object.
const saveNewObject = async (token: string, sampleObject: SampleObject) => {
  const client = SlackAPI(token, {});

  try {
    //assign a random object_id
    sampleObject.object_id = "OBJ-" +
      (Math.floor(100000 + Math.random() * 900000));

    //save the sample Object
    const response = await client.apps.datastore.put(
      {
        datastore: "SampleObjects",
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
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { saveNewObject };
