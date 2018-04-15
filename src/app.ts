
import { FRETS } from "frets";
import * as moment from "moment";
import { SampleActions } from "./actions/SampleActions";
import { renderRootView } from "./components/UiRoot";
import AppProps, { SampleScreens } from "./models/AppProps";

const startingCondition = new AppProps();
const startingActions = new SampleActions();

const F = new FRETS<AppProps, SampleActions>(startingCondition, startingActions);

F.validator = (newProps: AppProps, oldProps: AppProps): AppProps => {

  return newProps;
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

F.actions.navAbout = F.registerAction((e: Event, props: AppProps): AppProps => {
  console.log("nav about");
  props.activeScreen = SampleScreens.About;
  return props;
});

F.actions.navHome = F.registerAction((e: Event, props: AppProps): AppProps => {
  console.log("nav home");
  props.activeScreen = SampleScreens.Home;
  return props;
});

F.actions.screenActions[SampleScreens.Home] = F.actions.navHome;
F.actions.screenActions[SampleScreens.About] = F.actions.navAbout;


F.registerView(renderRootView);
F.mountTo("mainapp");
