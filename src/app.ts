
import { FRETS } from "frets";

import addHours from "date-fns/esm/addHours";
import format from "date-fns/esm/format";

import { SampleActions } from "./actions/SampleActions";
import { renderRootView } from "./components/UiRoot";
import AppProps from "./models/AppProps";
import { registerRoutes, SampleScreens } from "./navigation";

import * as just from "just-animate";

import { waapiPlugin } from "just-animate/lib.es2015/web";
import { IUser } from "./models/AppProps";
just.addPlugin(waapiPlugin);

const startingCondition: AppProps = new AppProps();
const startingActions = new SampleActions();

export type App = FRETS<AppProps, SampleActions>;

const F: App = new FRETS<AppProps, SampleActions>(startingCondition, startingActions);

F.validator = (newProps: Readonly<AppProps>, oldProps: AppProps): [AppProps, boolean] => {
  // debugger;
  const messages: string[] = [];
  const onSamePage: boolean = (newProps.activeScreen === oldProps.activeScreen);
  let result: AppProps;
  let isValid = true;

  if (newProps.counter < 0) {
    isValid = false;
    messages.push("Can't set counter to less than 0.");
  }
  if (newProps.counter > 4) {
    isValid = false;
    messages.push("Can't set counter to more than 4.");
  }

  // reject all changes by default, but merge in new validation messages
  if (isValid) {
    result = Object.assign({}, newProps);
  } else {
    result = Object.assign({}, oldProps);
  }

  // Other error messages that don't invalidate the update
  if (newProps.networkError) {
    messages.push(newProps.networkError);
    result.networkError = null;
  }

  // clear the alerts if we navigated to a new page
  result.messages = onSamePage ? messages : [];

  return [result,  isValid];
};

F.calculator = (props: Readonly<AppProps>, oldProps: AppProps): AppProps => {
  let vals;
  if (props.users.length > oldProps.users.length) {
    const oldId = props.registeredFieldsValues.id;
    vals = { ...props.registeredFieldsValues, id: Number.parseInt(oldId, 10) + 1 };
  } else {
    vals = props.registeredFieldsValues;
  }

  return {
    ...props,
    registeredFieldsValues: vals,
    counterIncreased: !!(oldProps.counter < props.counter),
    previousTime: format(addHours(new Date(), oldProps.counter), "ddd h a"),
    timeCounter: format(addHours(new Date(), props.counter), "ddd h a"),
   };
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
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load data from api (${response.status}).`);
      }
      return response.json();
    })
    .then((data) => {
      const users: IUser[] =
        (data && data.length)
          ? data
          : [... props.users, data];
      F.render({
        ...props,
        user: users[users.length - 1],
        users,
        isLoading: false,
        networkError: "",
      });
    })
    .catch((err: Error) => {
      F.render({...props, isLoading: false, networkError: "Error: " + err.message });
    });
  return {...props, isLoading: true};
});

registerRoutes(F);

F.registerView(renderRootView);
F.mountTo("mainapp");

