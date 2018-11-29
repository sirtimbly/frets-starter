import { ActionsWithFields } from "frets";
import { SampleScreens } from '../models/AppProps';

export class SampleActions extends ActionsWithFields {

  public navHome: (e: Event) => boolean;
  public navAbout: (e: Event) => boolean;
  public loadUser: (e: Event) => boolean;

  public activeScreen: SampleScreens = SampleScreens.Home;

  public screenActions = {
    0: this.navHome,
    1: this.navAbout,
  };
  addItem: (e: Event) => any;
  updateItem: (e: Event) => any;


}
