import { IFretsProps, PropsWithFields } from "frets";

export default class AppProps extends PropsWithFields {
  public screens: SampleScreens[] = [SampleScreens.Home,
                                     SampleScreens.About];
  public activeScreen: SampleScreens = SampleScreens.Home;
  public messages: string[];

  public isAuthenticated: boolean;
  public username: boolean;
  public counter: number = 0;
  public timeCounter: string;

}

export enum SampleScreens {
  Home,
  About,
}
