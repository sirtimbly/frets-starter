
import { FRETS } from "frets";
import * as moment from "moment";
import { SampleActions } from "./actions/SampleActions";
import { renderRootView } from "./components/UiRoot";
import AppProps, { SampleScreens } from "./models/AppProps";
import { registerRoutes } from "./navigation";

const startingCondition = new AppProps();
const startingActions = new SampleActions();

const F = new FRETS<AppProps, SampleActions>(startingCondition, startingActions);

F.validator = (newProps: AppProps, oldProps: AppProps): [AppProps, boolean] => {
  let messages: string[] = [];
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
  props.timeCounter = moment().add(props.counter, "hours").format("ddd h a");
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

F.actions.loadUser = F.registerAction((e: Event, props: AppProps) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(json => {
      const user = json[(Math.random() * 10).toFixed()];
      console.log("recieved fetch");
      props.username = user.username,
      F.render(props);
    });
  return props;
})

registerRoutes(F);

F.registerView(renderRootView);
F.mountTo("mainapp");

