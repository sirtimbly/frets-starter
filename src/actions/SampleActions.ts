import { ActionsWithFields } from "frets";
import { SampleScreens } from '../models/AppProps';

export class SampleActions extends ActionsWithFields {

  public navHome: (e: Event) => boolean;
  public navAbout: (e: Event) => boolean;
  public increment: (e: Event) => boolean;
  public decrement: (e: Event) => boolean;

  public activeScreen: SampleScreens = SampleScreens.Home;

  public screenActions = {
    0: this.navHome,
    1: this.navAbout,
  };

}
