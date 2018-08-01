import { IFretsProps, PropsWithFields } from "frets";
import { FormPanel } from "./FormPanel";

export default class LoggingProps extends PropsWithFields implements IFretsProps<HortusScreens> {
  public screens: HortusScreens[] = [
    HortusScreens.Dashboard,
    HortusScreens.Products,
    HortusScreens.Production,
    HortusScreens.Sales,
    HortusScreens.Purchases,
  ];
  public activeScreen: HortusScreens = HortusScreens.Dashboard;
  public messages: string[];

  public isAuthenticated: boolean;
  public username: boolean;
  public counter: number = 0;
  public timeCounter: string;
  public currentForm: { panels: FormPanel[]};

  public registeredFieldValues;

}

export enum HortusScreens {
  Dashboard,
  Products,
  Production,
  Sales,
  Purchases,
  About,
}

