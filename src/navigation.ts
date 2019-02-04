import { FRETS } from "frets";
import { SampleActions } from "./actions/SampleActions";
import { App } from "./app";
import AppProps, { SampleScreens } from "./models/AppProps";

export const RouteKeys = {
  About: "About",
  Home: "Home",
};

export function registerRoutes(F: App): App {

F.actions.navAbout = F.registerAction((e: Event, props: Readonly<AppProps>): AppProps => {
  console.log("nav about");
  F.navToRoute(RouteKeys.About);
  return {...props, activeScreen: SampleScreens.About};
});

F.actions.navHome = F.registerAction((e: Event, props: Readonly<AppProps>): AppProps => {
  console.log("nav home");
  F.navToRoute(RouteKeys.Home);
  return {...props, activeScreen: SampleScreens.Home};
});

F.actions.screenActions[SampleScreens.Home] = F.actions.navHome;
F.actions.screenActions[SampleScreens.About] = F.actions.navAbout;

F.registerRoute(RouteKeys.Home, "/", (name, params, props) => {
  return { ...props, activeScreen: SampleScreens.Home };
});

F.registerRoute(RouteKeys.About, "/about", (name, params, props) => {
  return { ...props, activeScreen: SampleScreens.About };
});

return F;
}
