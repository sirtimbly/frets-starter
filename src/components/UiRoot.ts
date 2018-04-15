import { $, $$ } from "../base-styles";

import { VNode } from "maquette";

import { ViewActions } from "frets";
import { SampleActions } from "../actions/SampleActions";

import AppProps, { SampleScreens } from "../models/AppProps";
import { HPanel, Icons, Menu, Panel } from "./UiAtoms";

export const renderRootView = (props: AppProps, actions: SampleActions): VNode => {
  let component: VNode;

  return $.div.flex.flexColumn.h([
    $.div.bgSilver.p2.borderBottom.borderGray.shadow.flex.justifyBetween.Bold.h([
      $.div.h(["My FRETS App"])
    ]),
    props.messages
      ? $.div.h5.bgOrange.block.p2.white.Bold.h(
          props.messages.map((s: string) => $.div.h([s]))
        )
      : "",
    $.div.flex.h([
      $.div.col_3.pt2.h([Menu(props, false, actions)]),
      $.div.col_9.pr2.h([
        (props.activeScreen === SampleScreens.Home)
          ? renderHome(props, actions)
          : renderAbout(props, actions),
      ]),
    ]),
  ]);
};

const renderHome = (props: AppProps, actions: SampleActions) =>
  HPanel([
    $.div.bgLightGray.rounded.p1.mx2.h2.h([props.counter.toFixed()]),
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
  ]);

const renderAbout = (props: AppProps, actions: SampleActions) => Panel([
    $$("h2").h(["About FRETS"]),
    $$("p").gray.borderTop.pt2.h([`See the documentation online at`]),
    $$("a").h({
      href: "https://github.com/sirtimbly/frets",
      target: "_blank",
    }, ["github.com/sirtimbly/frets"]),
  ]);
