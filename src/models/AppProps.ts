import { IFretsProps, PropsWithFields } from "frets";

export default class AppProps extends PropsWithFields {
  public screens: SampleScreens[] = [SampleScreens.Home,
                                     SampleScreens.About];
  public messages: string[];

  public isAuthenticated: boolean;
  public username: boolean;
  public counter: number = 0;
  public timeCounter: string;
  constructor(public activeScreen: SampleScreens = SampleScreens.Home) {
    super();
  }

}

export enum SampleScreens {
  Home,
  About,
}
