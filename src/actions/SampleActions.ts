import { SampleScreens } from "../models/AppProps";

export class SampleActions {

  public navHome: (e: Event) => boolean;
  public navAbout: (e: Event) => boolean;
  public increment: (e: Event) => boolean;
  public decrement: (e: Event) => boolean;

  public screenActions = {
    0: this.navHome,
    1: this.navAbout,
  };

}
