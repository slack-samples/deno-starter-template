import { SlackAPI } from "deno-slack-api/mod.ts";
import type { SampleObject } from "./../types/sample_object.ts";

//This function queries for a particular object, and returns that object if it is found.
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

export { getObject };
