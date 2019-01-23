import { $, $$ } from "../base-styles";

import { VNode } from "maquette";

import { FRETS } from "frets";
import { SampleActions } from "../actions/SampleActions";

import { IRegisteredField } from "frets/build/main/Frets";
import AppProps, { SampleScreens } from "../models/AppProps";
import { HPanel, Icons, Menu, Panel, $grid } from "./UiAtoms";

export const renderRootView = (app: FRETS<AppProps, SampleActions> ): VNode => {
  const { modelProps: props, actions } = app;
  const idField = app.registerField<string>("id", "1");
  return $.div.flex.flexColumn.h([
    $.div.bgSilver.p2.borderBottom.borderGray.shadow.flex.justifyBetween.Bold.h([
      $.div.h(["My FRETS App"]),
    ]),
    props.messages.length
      ? $.div.h5.bgOrange.block.p2.white.Bold.h(
          props.messages.map((s: string) => $.div.h({key: s}, [s])),
        )
      : "",
    $grid.h([
      $.div.col.col_3.smCol.smCol_12.pt2.h([Menu(props, false, actions)]),
      $.div.col.col_9.smCol.smCol_12.px2.h([
        (props.activeScreen === SampleScreens.Home)
          ? renderHome(props, actions, idField)
          : renderAbout(props, actions),
      ]),
    ]),
  ]);
};

const renderHome = (props: AppProps, actions: SampleActions, idField: IRegisteredField<string>) => {

  return Panel(null, null,
    $.div.leftAlign.pb2.h([
      $.h2.h(["Example Frontend Application"]),
      $.p.p1.bgSilver.blue.h([
        Icons​​.check(),
        "Demonstrates dynamic calculation, routing, async data, and validation."]),
    ]),
    HPanel({ key: "incrementer" },
      $.button.btn.btnOutline.h(
        {
          onclick: actions.decrement,
        },
        ["-"],
      ),
      $.button.btn.btnOutline.ml2.h(
        {
          onclick: actions.increment,
        },
        ["+"],
      ),
      $.div.bgLightGray.rounded.p1.mx1.h2.h([props.counter.toFixed() + " hours"]),
      $.div.h([$.div.bgLightBlue.rounded.mx1.p1.h2.h([props.timeCounter])]),
    ),
    HPanel({ key: "fakeData"},
      $.label.m1.h(["UserId",
        $.input.h({
          onblur: idField.handler,
          value: idField.value,
        }),
      ]),
      $.button.btn.btnOutline.rounded.p1.m1.h({ onclick: actions.loadUser}, ["Fetch API Data"]),
      $.div.bgLightGray.rounded.p1.m1.h(["Username: " + props.username]),
    ),
  );
};

const renderAbout = (props: AppProps, actions: SampleActions) => Panel(null, null,
    $$("h2").h(["About FRETS"]),
    $$("p").gray.borderTop.pt2.h([`See the documentation online at`]),
    $$("a").h({
      href: "https://github.com/sirtimbly/frets",
      target: "_blank",
    }, ["github.com/sirtimbly/frets"]),
  );
