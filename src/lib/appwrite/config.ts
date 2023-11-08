import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: "6540f20ccdc71cfcafa0",
  storageId: "6544b18ac51cdf935845",
  databaseId: "6544b1d6633fb017746a",
  userCollectionId: "6544b235a4bc6c42f26f",
  postCollectionId: "6544b21574f3320436f7",
  savesCollectionId: "6544b24a81da22b65ec0",
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
