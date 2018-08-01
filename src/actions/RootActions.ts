import { ActionsWithFields } from "frets";
import { HortusScreens } from "../models/AppProps";

export class RootActions extends ActionsWithFields {

  public navHome: (e: Event) => boolean;
  public navAbout: (e: Event) => boolean;
  public newProduct: (e: Event) => boolean;
  public increment: (e: Event) => boolean;
  public decrement: (e: Event) => boolean;

  public screenActions = {
    0: this.navHome,
    1: this.navAbout,
    2: this.newProduct,
  };

}
