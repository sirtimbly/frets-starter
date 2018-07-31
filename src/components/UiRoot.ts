import { $, $$ } from "../app-styles";

import { VNode } from "maquette";

import { ViewActions, FRETS } from "frets";
import { SampleActions } from "../actions/SampleActions";

import AppProps, { SampleScreens } from "../models/AppProps";
import { Badge } from "./badge";
import { Button } from "./button";
import { Menu } from "./menu";
import { HPanel, Panel } from "./panel";
import { Input } from "./input_text";

export const renderRootView = (app: FRETS<AppProps, SampleActions>): VNode => {
  const props = app.modelProps;
  const actions = app.actions;
  let component: VNode;

  return $.div.w_100.vh_100.flex.flexColumn.h([
    $.div.flex.pa2.bgLightestBlue.flex.justifyBetween.fw6.h([
      $.div.wAuto.center.tc.pv4.pv5Ns.h([
        $$("img").br_100.pa1.bgWhite.h3.w3.h({
          src: "http://uploads.timbendt.com.s3.amazonaws.com/dropzone/fretslogo4@1x.png",
        }),
        $$("h1").f5.f4Ns.fw6.midGray.h(["My Application"]),
        $$("h2").f6.gray.fw2.ttu.tracked.h(["A Caring Company"]),
      ]),
    ]),
    props.messages
      ? $.div.h5.bgOrange.pa2.white.b.h(
          props.messages.map((s: string) => $.div.h([s])),
        )
      : "",
    $.div.flex.h_100.h([
      $.div.h_100.w_10.pt4.pl4.h([Menu(props, false, actions)]),
      $.div.w_90.pa4.h({key: props.activeScreen}, [
        (props.activeScreen === SampleScreens.Home)
          ? renderHome(app)
          : renderAbout(props, actions),
      ]),
    ]),
  ]);
};

const renderHome = (app: FRETS<AppProps, SampleActions>) => {
  const field = app.registerField("form_name", "bob");
  return Panel([
    HPanel([
      Input("Your Name", {value: field.value, onchange: field.handler}),
    ]),
    HPanel([
      Button({ onclick: app.actions.decrement },
        ["-"],
      ),
      Badge([app.modelProps.counter.toFixed()]),
      Button({ onclick: app.actions.increment },
        ["+"],
      ),
    ]),
    HPanel([`Hello, ${field.value} you have ${app.modelProps.counter} things.`])
  ]);
}

const renderAbout = (props: AppProps, actions: SampleActions) => Panel([
    $$("h2").h(["About FRETS"]),
    $$("p").gray.bt.pt2.h([`See the documentation online at`]),
    $$("a").h({
      href: "https://github.com/sirtimbly/frets",
      target: "_blank",
    }, ["github.com/sirtimbly/frets"]),
  ]);
