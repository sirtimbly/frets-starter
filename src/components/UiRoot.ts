import { $, $$ } from "../app-styles";

import { VNode } from "maquette";

import { ViewActions } from "frets";
import { SampleActions } from "../actions/SampleActions";

import AppProps, { SampleScreens } from "../models/AppProps";
import { HPanel, Icons, Menu, Panel } from "./UiAtoms";

export const renderRootView = (props: AppProps, actions: SampleActions): VNode => {
  let component: VNode;

  return $.div.flex.flexColumn.h([
    $.div.bgSilver.pa2.bb.bGray.shadow_1.flex.justifyBetween.fw6.h([
      $.div.h(["My FRETS App"]),
      $.div.tc.pv4.pv5Ns.h([
        $$("img").br_100.pa1.ba.bBlack_10.h3.w3.h({src: "http://tachyons.io/img/logo.jpg"}),
        $$("h1").f5.f4Ns.fw6.midGray.h(["Jasper Whitehouse"]),
        $$("h2").f6.gray.fw2.ttu.tracked.h(["Los Angeles"]),
      ]),
    ]),
    props.messages
      ? $.div.h5.bgOrange.pa2.white.b.h(
          props.messages.map((s: string) => $.div.h([s]))
        )
      : "",
    $.div.flex.h([
      $.div.w_25.pt2.h([Menu(props, false, actions)]),
      $.div.w_75.pr2.h([
        (props.activeScreen === SampleScreens.Home)
          ? renderHome(props, actions)
          : renderAbout(props, actions),
      ]),
    ]),
  ]);
};

const renderHome = (props: AppProps, actions: SampleActions) =>
  HPanel([
    $.div.bgLightGray.br3.pa1.mh2.h2.h([props.counter.toFixed()]),
    $.button.button.outline.h(
      {
        onclick: actions.decrement,
      },
      ["-"],
    ),
    $.button.button.outline.ml2.h(
      {
        onclick: actions.increment,
      },
      ["+"],
    ),
  ]);

const renderAbout = (props: AppProps, actions: SampleActions) => Panel([
    $$("h2").h(["About FRETS"]),
    $$("p").gray.bt.pt2.h([`See the documentation online at`]),
    $$("a").h({
      href: "https://github.com/sirtimbly/frets",
      target: "_blank",
    }, ["github.com/sirtimbly/frets"]),
  ]);
