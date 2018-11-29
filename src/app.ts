
import * as moment from "moment";

import { FRETS } from "frets";

import { SampleActions } from "./actions/SampleActions";
import { renderRootView } from "./components/UiRoot";
import AppProps, { SampleScreens } from "./models/AppProps";
import { IPayloadItem } from "./models/Domain";
import { Item } from "./models/Item";
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
  for (let i = 0; i < props.axes.length; i++) {
    const axis = props.axes[i];
    props.items = props.items.map((item: Item): Item => {

      if (!item.axisValues) {
        item.axisValues = {};
      }
      if (!item.axisValues[axis.name]) {
        item.axisValues[axis.name] = "0";
      }
      const axisFieldValue = props.registeredFieldsValues[item.name + "-" + axis.name];
      if (axisFieldValue) {
        item.axisValues[axis.name] = axisFieldValue;
      }
      const itemFieldValue = props.registeredFieldsValues["item-" + item.name];
      if (itemFieldValue && itemFieldValue !== item.name) {
        item.name = itemFieldValue;
      }
      return item;
    });
    console.log("Props calculated as: ", props);
  }
  return props;
};

// F.actions.addItem = F.registerAction((e: Event, props: AppProps) => {
//   try {
//     props.items = Upsert(props.items, "name", data.Item);
//   } catch (err) {
//     return new Context(_TAO.Error.Create.Web, { Error: err });
//   }
//   return false;
// });

registerRoutes(F);

F.registerView(renderRootView);
F.mountTo("mainapp");
