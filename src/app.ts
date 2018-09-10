
import { FRETS } from "frets";
import * as moment from "moment";
import { SampleActions } from "./actions/SampleActions";
import { renderRootView } from "./components/UiRoot";
import AppProps, { SampleScreens } from "./models/AppProps";

const startingCondition = new AppProps();
const startingActions = new SampleActions();

export const RouteKeys = {
  About: "About",
  Home: "Home",
};

const F = new FRETS<AppProps, SampleActions>(startingCondition, startingActions);

F.validator = (newProps: AppProps, oldProps: AppProps): [AppProps, boolean] => {
  const messages: string[] = [];
  let result;
  let isValid = true;
  if (newProps.counter < 0) {
    isValid = false;
    messages.push("Can't set counter to less than 0.");
  }
  // reject all changes by default, but merge in new validation messages
  if (isValid) {
    result = Object.assign({}, newProps);
  } else {
    result = Object.assign({}, oldProps);
  }
  result.messages = messages;
  return [result,  isValid];
};

F.calculator = (props: AppProps, oldProps: AppProps): AppProps => {
  props.timeCounter = moment().add(props.counter, "hours").toLocaleString();
  return props;
};

F.actions.increment = F.registerAction((e: Event, props: AppProps): AppProps => {
  props.counter++;
  return props;
});

F.actions.decrement = F.registerAction((e: Event, props: AppProps): AppProps => {
  props.counter--;
  return props;
});

// F.actions.navAbout = F.registerAction((e: Event, props: AppProps): AppProps => {
//   console.log("nav about");
//   props.activeScreen = SampleScreens.About;
//   return props;
// });

// F.actions.navHome = F.registerAction((e: Event, props: AppProps): AppProps => {
//   console.log("nav home");
//   props.activeScreen = SampleScreens.Home;
//   return props;
// });


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


F.registerView(renderRootView);
F.mountTo("mainapp");
