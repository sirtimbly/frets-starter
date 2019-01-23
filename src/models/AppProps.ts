import { IFretsProps, PropsWithFields } from "frets";

export default class AppProps extends PropsWithFields {
  public screens: SampleScreens[] = [SampleScreens.Home,
                                     SampleScreens.About];
  public messages: string[];
  public isLoading: boolean;
  public isAuthenticated: boolean;
  public username: string;
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
