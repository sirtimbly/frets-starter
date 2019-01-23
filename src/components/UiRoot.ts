import { $, $$ } from "../base-styles";

import { VNode } from "maquette";

import { FRETS } from "frets";
import { SampleActions } from "../actions/SampleActions";

import { IRegisteredField } from "frets/build/main/Frets";
import AppProps, { SampleScreens } from "../models/AppProps";
import { $grid } from "./UiAtoms";
import { alert } from "./Notifications";
import { Menu } from "./Menu";
import { VPanel, HPanel, Panel } from "./Panels";
import { Icons } from "./Icons";

export const renderRootView = (app: FRETS<AppProps, SampleActions> ): VNode => {
  const { modelProps: props, actions } = app;
  const idField = app.registerField<string>("id", "1");
  return $.div.flex.flexColumn.h([
    $.div.bgSilver.p2.borderBottom.borderGray.shadow.flex.justifyBetween.Bold.h([
      $.div.h(["My FRETS App"]),
    ]),
    props.messages.length
      ? alert(props.messages) : "",
    $grid.h([
      $.div.col.col_2.smCol.smCol_12.pt2.h([Menu(props, false, actions)]),
      $.div.col.col_10.smCol.smCol_12.px2.h([
        (props.activeScreen === SampleScreens.Home)
          ? renderHome(props, actions, idField)
          : renderAbout(props, actions),
      ]),
    ]),
  ]);
};

const renderHome = (props: AppProps, actions: SampleActions, idField: IRegisteredField<string>) => {

  return VPanel("Example Frontend Application", {},
    $.div.leftAlign.pb2.h([
      $.p.p1.bgSilver.blue.h([
        Icons​​.thumbsUp(),
        "Demonstrates dynamic calculation, routing, async data, and validation."]),
    ]),
    HPanel("Simple Incrementer with Validation", { key: "incrementer" },
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
      $.div.h([$.div.lightBlue.rounded.mx1.p1.h2.h([props.timeCounter])]),
    ),
    HPanel("Async Fetching", { key: "fakeData"},
      $.label.m1.h([
        $.label.gray.h([
          "Placeholder API ",
          $.a.btn.btnCircle.littleCircle.h({
            href:  "https://jsonplaceholder.typicode.com/",
            title: "https://jsonplaceholder.typicode.com/users/",
          }, ["?"]),
          $.input.maxWidth_1.h({
            onblur: idField.handler,
            type: "text",
            value: idField.value,
          }),
        ]),
      ]),
      $.button.btn.btnPrimary.btnOutline.rounded.p1.m1.h({
        classes: $$().when(props.isLoading).bgGray.white.toObj(),
        disabled: props.isLoading,
        onclick: actions.loadUser,
      },
      [
          props.isLoading ? Icons.refresh() : Icons.ok(),
          "Fetch API Data",
      ]),
    ),
    VPanel("Data Results", {},
      $.div.rounded.p1.m1.h({
        class: !!props.username ? "green" : "gray",
      }, [
        "API Response Username",
        props.username ? Icons.ok() : " - Not Loaded",
        " " + props.username,
      ]),
    ),
  );
};

const renderAbout = (props: AppProps, actions: SampleActions) => VPanel("About FRETS", {},
    $$("p").gray.borderTop.pt2.h([`See the documentation online at`]),
    $$("a").h({
      href: "https://github.com/sirtimbly/frets",
      target: "_blank",
    }, ["github.com/sirtimbly/frets"]),
  );
