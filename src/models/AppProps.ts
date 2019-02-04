import { IFretsProps, PropsWithFields } from "frets";
export interface IUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: any;
  company?: any;
}

export default class AppProps extends PropsWithFields {
  public screens: SampleScreens[] = [SampleScreens.Home,
                                     SampleScreens.About];
  public messages: string[] = [];
  public isLoading: boolean;
  public isAuthenticated: boolean;
  public networkError: string;
  public user: IUser;
  public users: IUser[] = [];
  public counter: number = 0;
  public timeCounter: string;
  public previousTime: string;
  public counterIncreased: boolean;

  public showIncrementor: boolean;
  public showForm: boolean;
  public showTable: boolean;

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
