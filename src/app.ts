
import { FRETS } from "frets";
import * as moment from "moment";
import { RootActions } from "./actions/RootActions";
import { renderRootView } from "./components/UiRoot";
import AppProps, { HortusScreens } from "./models/AppProps";
import { FormPanel } from "./models/FormPanel";

export const RouteKeys = {
  About: "About",
  Dashboard: "Dashboard",
  Production: "Production",
};

const startingCondition = new AppProps();
const startingActions = new RootActions();

const F = new FRETS<AppProps, RootActions>(startingCondition, startingActions);

F.validator = (newProps: AppProps, oldProps: AppProps): AppProps => {

  return newProps;
};

F.calculator = (props: AppProps, oldProps: AppProps): AppProps => {
  const newProps = Object.assign({}, props);
  // newProps.activeScreen = HortusScreens.Production;
  newProps.currentForm = {
    panels: [
      {
        title: "New Product",
        subtitle: "First Select The Type",
      } as FormPanel,
    ],
  };
  newProps.timeCounter = moment().add(newProps.counter, "hours").toLocaleString();
  return newProps;
};

F.actions.increment = F.registerAction((e: Event, props: AppProps): AppProps => {
  props.counter++;
  return props;
});

F.actions.decrement = F.registerAction((e: Event, props: AppProps): AppProps => {
  props.counter--;
  return props;
});

F.actions.newProduct = F.registerAction((e: Event, props: AppProps): AppProps => {
  console.log("Adding new product");
  F.navToRoute(RouteKeys.Production);

  return props;
});

F.actions.navAbout = F.registerAction((e: Event, props: AppProps): AppProps => {
  console.log("nav about");
  F.navToRoute(RouteKeys.About);
  props.activeScreen = HortusScreens.About;
  return props;
});

F.actions.navHome = F.registerAction((e: Event, props: AppProps): AppProps => {
  console.log("nav home");
  F.navToRoute(RouteKeys.Dashboard);
  props.activeScreen = HortusScreens.Dashboard;
  return props;
});

F.actions.screenActions[HortusScreens.Dashboard] = F.actions.navHome;
F.actions.screenActions[HortusScreens.About] = F.actions.navAbout;
F.actions.screenActions[HortusScreens.Production] = F.actions.newProduct;

const genericRootPageFn = (name: string, params, props: AppProps): AppProps => {
  console.log("routing to", name, params);
  const data = Object.assign({}, props);
  data.activeScreen = HortusScreens[name];
  return data;
}

F.registerRoute(RouteKeys.Production, "/production", genericRootPageFn);

F.registerRoute(RouteKeys.Dashboard, "/dashboard", genericRootPageFn);
F.registerRoute(RouteKeys.About, "/about", genericRootPageFn);

F.registerView(renderRootView);
F.mountTo("mainapp");


