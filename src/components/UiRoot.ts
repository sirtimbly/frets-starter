import { $, $$ } from "../app-styles";

import { VNode } from "maquette";

import { FRETS } from "frets";
import { SampleActions } from "../actions/SampleActions";

import AppProps, { SampleScreens } from "../models/AppProps";
import { HPanel, Icons, Panel } from "./UiAtoms";
import { IRegisteredField } from "frets/build/main/Frets";
import { ItemEditor } from "./ItemEditor/ItemEditor";
import { ChartPlot } from "./ChartPlot/ChartPlot";

export const renderRootView = (app: FRETS<AppProps, SampleActions> ): VNode => {
  const { modelProps: props, actions } = app;
  const idField = app.registerField<string>("id", "1");
  return $.div.flex.flexColumn.h([
    $.div.bgSilver.pa2.brBottom.bDarkGray.flex.justifyBetween.f2.h([
      $.div.h(["Decision Maker"]),
    ]),
    props.messages.length
      ? $.div.h5.bgOrange.pa2.white.f2.h(
          props.messages.map((s: string) => $.div.h({key: s}, [s])),
        )
      : "",
    $.div.flex.h([
      $.div.pt2.h(["...Menu Here"]),
      $.div.pr2.h([
        (props.activeScreen === SampleScreens.Home)
          ? renderHome(app)
          : renderAbout(props, actions),
      ]),
    ]),
  ]);
};

const renderHome = (app: FRETS<AppProps, SampleActions>) => {
  return $.div.h([
    Panel(false, {}, ItemEditor(app)),
    Panel(false, {}, ChartPlot(app)),
  ]);

};

const renderAbout = (props: AppProps, actions: SampleActions) => Panel(null, null,
    $$("h2").h(["About The APp"]),
  );
