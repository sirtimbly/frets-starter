import {
  AnonymousCredential,
  RemoteMongoClient,
  Stitch,
  RemoteUpdateResult,
  StitchUser,
  StitchUserIdentity,
} from "mongodb-stitch-browser-sdk";
import AppProps from "./models/AppProps";


export default class DAL {
  public client = Stitch.initializeDefaultAppClient("decider_app-zcwou");
  public db = this.client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas").db("decider_app");
  private storageKey = "stitchUserId";
  private items = this.db.collection("items");
  public userId: string;

  constructor() {
    const id = window.localStorage.getItem(this.storageKey);
    if (id) {
      this.userId = id;
    }
  }

  public loginAnon(doc: AppProps): Promise<Array<{}>|void> {
    if (!this.userId) {
      return this.client.auth.loginWithCredential(new AnonymousCredential()).then((user) => {
        this.userId = user.id;
        window.localStorage.setItem(this.storageKey, this.userId);
        this.items.updateOne({owner_id: this.client.auth.user.id}, doc, {upsert: true})
          .then(() => {
            return this.items.find({owner_id: this.client.auth.user.id}, { limit: 100}).asArray();
            });
      });
    } else {
      // return this.items.updateOne({owner_id: this.userId}, doc, {upsert: true})
      //   .then(() => {
      return this.items.find({owner_id: this.userId}, { limit: 100}).asArray();
          // });
    }
  }

  public updateDocument(doc: AppProps): Promise<RemoteUpdateResult> {
    return this.items.updateOne({owner_id: this.client.auth.user.id}, doc, {upsert: true});
  }
}
