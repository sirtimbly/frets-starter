import { FRETS } from "frets";
import { SampleActions } from "./actions/SampleActions";
import AppProps, { SampleScreens } from "./models/AppProps";

export const RouteKeys = {
  About: "About",
  Home: "Home",
};

export function registerRoutes
 (F: FRETS<AppProps, SampleActions>): FRETS<AppProps, SampleActions> {

F.actions.navAbout = F.registerAction((e: Event, props: AppProps): AppProps => {
  console.log("nav about");
  F.navToRoute(RouteKeys.About);
  props.activeScreen = SampleScreens.About;
  return props;
});

F.actions.navHome = F.registerAction((e: Event, props: AppProps): AppProps => {
  console.log("nav home");
  F.navToRoute(RouteKeys.Home);
  props.activeScreen = SampleScreens.Home;
  return props;
});

F.actions.screenActions[SampleScreens.Home] = F.actions.navHome;
F.actions.screenActions[SampleScreens.About] = F.actions.navAbout;

F.registerRoute(RouteKeys.Home, "/", (name, params, props) => {
  props.activeScreen = SampleScreens.Home;
  return props;
});

F.registerRoute(RouteKeys.About, "/about", (name, params, props) => {
  props.activeScreen = SampleScreens.About;
  return props;
});

return F;
}
