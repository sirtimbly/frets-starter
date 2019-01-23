import { IFretsProps, PropsWithFields } from "frets";

export default class AppProps extends PropsWithFields {
  public screens: SampleScreens[] = [SampleScreens.Home,
                                     SampleScreens.About];
  public messages: string[];
  public isLoading: boolean;
  public isAuthenticated: boolean;
  public networkError: string;
  public user: {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: any;
    company?: any;
  };
  public counter: number = 0;
  public timeCounter: string;
  constructor(public activeScreen: SampleScreens = SampleScreens.Home) {
    super();
  }

  public get username(): string {
    return this.user.username;
  }

}

export enum SampleScreens {
  Home,
  About,
}
