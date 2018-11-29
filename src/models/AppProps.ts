import { IFretsProps, PropsWithFields } from "frets";
import { Item } from "./Item";
import { Axis } from "./Axis";

export default class AppProps extends PropsWithFields {
  public screens: SampleScreens[] = [SampleScreens.Home,
                                     SampleScreens.About];
  public activeScreen: SampleScreens = SampleScreens.Home;
  public messages: string[];

  public isAuthenticated: boolean;
  public username: boolean;
  public counter: number = 0;
  public timeCounter: string;
  public items: Item[] = [new Item()];
  public axes: Axis[] = [new Axis("Difficulty"), new Axis("Benefit")];

}

export enum SampleScreens {
  Home,
  About,
}
