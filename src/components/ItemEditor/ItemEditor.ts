import { FRETS } from "frets";
import { VNode } from "maquette";
import { $, $$ } from "../../app-styles";

import { SampleActions } from "../../actions/SampleActions";
import AppProps from "../../models/AppProps";

import { AxisValues, Item } from '../../models/Item';
import { AppDomain } from '../../models/Domain';

const domain = new AppDomain();

export function ItemEditor(app: FRETS<AppProps, SampleActions>): VNode {
  return $.div.h(app.modelProps.items.map((i: Item) => {
    const itemNameField = app.registerField<string>("item-" + i.name, i.name);
    return $.div.mv1.pa1.flex.h([
      inputLabel("Item Name: ",
        $.input.ba.ml1.h({
          // onblur: app.actions.updateItem,
          onblur: itemNameField.handler,

          //   })
          //   app.tao.propose(_TAO.Item.Update.Web.taople(), { Item: {
          //     name: (ev.currentTarget as HTMLInputElement).value,
          //   }});
          // },
          type: "text",
          value: i.name,
        }),
      ),
      ...getAxisEditors(app, i.axisValues, i.name),
    ]);
  }));
}

function getAxisEditors(app: FRETS<AppProps, SampleActions>, axisValues: AxisValues, itemName: string): VNode[] {
  const result: VNode[] = [];
  for (let i = 0; i < app.modelProps.axes.length; i++) {
    const axis = app.modelProps.axes[i];
    const field = app.registerField<string>(itemName + "-" + axis.name, axisValues[axis.name]);
    if (axis && axis.name) {
      result.push(inputLabel(axis.name, $.input.w4.ba.ml1.h({
        oninput: field.handler,
        type: "number",
        value: axisValues[axis.name],
      })));
    }
  }
  return result;
}

export function inputLabel(...items: Array<VNode | string>) {
  return $.label.pv1.ph2.ma2.br1.bgWashedYellow.flexColumn.mr1.h(items);
}
