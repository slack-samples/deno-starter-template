import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

const SampleObjectDatastore = DefineDatastore({
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
      type: Schema.types.object,
    },
  },
});

const getObject = async (token: string, objectID: string) => {
  const client = SlackAPI(token, {});

  try {
    const response = await client.apiCall("apps.datastore.get", {
      datastore: "Sample_Objects",
      id: objectID,
    });

    if (!response.ok) {
      console.log("Error calling apps.datastore.get:");
      return {
        error: response.error,
      };
    } else {
      console.log("Datastore get successful!");
      return response.item;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

//This function saves an object into the datastore, and returns the object.
const saveObject = async (
  token: string,
  sampleObject: Record<string, unknown>,
) => {
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

export { getObject, SampleObjectDatastore, saveObject };
