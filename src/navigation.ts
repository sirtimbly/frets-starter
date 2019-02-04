import { FRETS } from "frets";
import { SampleActions } from "./actions/SampleActions";
import { App } from "./app";
import AppProps from "./models/AppProps";

export type SampleScreens = keyof IRouteKeys;

export interface IRouteKeys {
  About: SampleScreens;
  Home: SampleScreens;
  Users: SampleScreens;
}

export interface IKeyObject {
  [K: string]: SampleScreens;
}

export const RouteKeys: IKeyObject = {
  Home: "Home",
  Users: "Users",
  About: "About",
};

export function registerRoutes(F: App): App {

  for (const key in RouteKeys) {
    if (RouteKeys.hasOwnProperty(key)) {
      F.actions.nav[key] = F.registerAction((e: Event, props: Readonly<AppProps>): AppProps => {
        console.log("nav ", key);
        F.navToRoute(RouteKeys[key]);
        return {...props, activeScreen: RouteKeys[key]};
      });
      F.actions.screenActions.push(F.actions.nav[key]);

    }
  }

  return F;
}
