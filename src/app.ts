
import { FRETS } from "frets";
import * as moment from "moment";
import { SampleActions } from "./actions/SampleActions";
import { renderRootView } from "./components/UiRoot";
import AppProps, { SampleScreens } from "./models/AppProps";
import { registerRoutes } from "./navigation";

const startingCondition: AppProps = new AppProps();
const startingActions = new SampleActions();

const F = new FRETS<AppProps, SampleActions>(startingCondition, startingActions);

F.validator = (newProps: Readonly<AppProps>, oldProps: AppProps): [AppProps, boolean] => {
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

F.calculator = (props: Readonly<AppProps>, oldProps: AppProps): AppProps => {
  return { ...props, timeCounter: moment().add(props.counter, "hours").format("ddd h a") };
};

F.actions.increment = F.registerAction((e: Event, props: Readonly<AppProps>): AppProps => {
  return { ...props, counter: props.counter + 1 };
});

F.actions.decrement = F.registerAction((e: Event, props: Readonly<AppProps>): AppProps => {
  return {...props, counter: props.counter - 1};
});

F.actions.loadUser = F.registerAction((e: Event, props: Readonly<AppProps>) => {
  const id = props.registeredFieldsValues.id;
  fetch("https://jsonplaceholder.typicode.com/users/" + id)
    .then((response) => response.json())
    .then((json) => {
      // console.log("recieved fetch");
      let user;
      if (json && json.length) {
        user = json[(Math.random() * Number.parseInt(json.length, 10)).toFixed()];
      } else {
        user = json;
      }
      F.render({...props, username: user.username});
    });
  return props;
});

registerRoutes(F);

F.registerView(renderRootView);
F.mountTo("mainapp");
