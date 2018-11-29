import { FRETS } from "frets";
import { VNode } from "maquette";
import { $, $$ } from "../../app-styles";

import { SampleActions } from "../../actions/SampleActions";
import AppProps from "../../models/AppProps";

import { AppDomain, FieldNames } from "../../models/Domain";
import { AxisValues, Item } from "../../models/Item";

const domain = new AppDomain();

export function ItemEditor(app: FRETS<AppProps, SampleActions>): VNode {
  const list = app.modelProps.items.map((i: Item) => {
    const itemNameField = app.registerField<string>("item-" + i.name, i.name);
    return $.div.mv1.pa1.flex.h({
      key: i.name,
    },
    [
      inputLabel("Item Name: ",
        $.input.ba.ml1.h({
          onblur: itemNameField.handler,
          type: "text",
          value: i.name,
        }),
      ),
      ...getAxisEditors(app, i.axisValues, i.name),
    ]);
  });
  const field = app.registerField<string>(FieldNames.NewItemName);
  list.push($.div.bgLightGreen.pa1.ma1.h([
    $.input.ba.h({
      classes: $.when(!!field.validationErrors.length).red.bRed.toObj(),
      oninput: field.handler,
      onkeydown: (ev: KeyboardEvent) => {
        if (ev.key === "Enter") {
          app.actions.addItem(ev);
        }
      },
      value: field.value,
    }),
    $.button.h({
      disabled: !!field.validationErrors.length,
      onclick: app.actions.addItem,
    }, ["Add Item"]),
    field.validationErrors.length ? $.span.red.h(field.validationErrors) : "",
  ]));
  return $.div.h(list);
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
