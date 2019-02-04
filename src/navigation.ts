import { FRETS } from "frets";
import { SampleActions } from "./actions/SampleActions";
import { App } from "./app";
import AppProps from "./models/AppProps";

export type SampleScreens = keyof IRouteKeys;

export type IKeyObject = {
  [key in SampleScreens]?: string;
}

export interface IRouteKeys {
  About: SampleScreens;
  Home: SampleScreens;
  Users: SampleScreens;
}

export const RouteKeys: IKeyObject = {
  Home: "/",
  Users: "/users",
  About: "/about",
};

export function applyRoutesToAppInstance(F: App): void {

  for (const key in RouteKeys) {
    if (RouteKeys.hasOwnProperty(key)) {
      F.registerRoute(key, RouteKeys[key], (routeName, routeParams, props: Readonly<AppProps>) => {
        return {...props, activeScreen: key as SampleScreens};
      });
      F.actions.nav[key] = F.registerAction((e: Event, props: Readonly<AppProps>): AppProps => {
        console.log("nav ", key);
        F.navToRoute(key);
        return {...props, activeScreen: key as SampleScreens};
      });
      F.actions.screenActions.push(F.actions.nav[key]);

    }
  }
}
