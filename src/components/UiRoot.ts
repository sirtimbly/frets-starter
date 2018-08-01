import { $, $$ } from "../app-styles";

import { VNode } from "maquette";

import { FRETS } from "frets";
import { RootActions } from "../actions/RootActions";

import AppProps, { HortusScreens } from "../models/AppProps";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input, SmallInput } from "./input_text";
import { Menu } from "./menu";
import { HPanel, Panel } from "./panel";
import { PillButton } from './button';
import { CompoundInput } from './input_text';
import { FormPanel } from '../models/FormPanel';

export const renderRootView = (app: FRETS<AppProps, RootActions>): VNode => {
  const props = app.modelProps;
  const actions = app.actions;
  let component: VNode;

  switch (props.activeScreen) {
    case HortusScreens.Dashboard:
      component = renderHome(app);
      break;
    case HortusScreens.About:
      component = renderAbout(props, actions);
      break;
    case HortusScreens.Production:
      component = renderPanelForm(app);
      break;
    default:
      component = $.div.bgOrange.white.b.pa3.ma3.h(["Routing Error"]);
      break;
  }


  return $.div.bgLightestBlue.w_100.vh_100.pa4.flex.flexColumn.h([
    $.div.flex.pa2.justifyBetween.h([
      $.div.wAuto.fw6.h([
        $$("h1").f5.f4Ns.fw6.midGray.h(["NVK"]),
        $$("h2").f6.gray.fw2.ttu.tracked.h(["HortusBI"]),
      ]),
      $.div.h([
        CompoundInput({}, [
          "Products",
          $$("i.fas.fa-caret-down").h(),
        ]),
      ]),
      $.div.h([
        PillButton([
          $$("i.far.fa-user").h(),
          $$("i.fas.fa-caret-down").h(),
        ]),
      ]),
    ]),
    props.messages
      ? $.div.h5.bgOrange.pa2.white.b.h(
          props.messages.map((s: string) => $.div.h([s])),
        )
      : "",
    $.div.bgNearWhite.flex.h_100.h([
      $.div.bgGreen.h_100.w_10.pt4.pl4.h([Menu(props, false, actions)]),
      $.div.w_90.pa4.h({key: props.activeScreen}, [
        component,
      ]),
    ]),
  ]);
};

const renderHome = (app: FRETS<AppProps, RootActions>) => {
  const field = app.registerField("form_name", "bob");
  return Panel([
    Button({
      click: app.actions.newProduct,
    }, ["New Product"]),
  ]);
};

const renderAbout = (props: AppProps, actions: RootActions) => Panel([
    $$("h2").h(["About FRETS"]),
    $$("p").gray.bt.pt2.h([`See the documentation online at`]),
    $$("a").h({
      href: "https://github.com/sirtimbly/frets",
      target: "_blank",
    }, ["github.com/sirtimbly/frets"]),
  ]);

const renderPanelForm = (app: FRETS<AppProps, RootActions>) => {
  if (app.modelProps.currentForm) {
    return $.div.flex.itemsStretch.h_100.h(app.modelProps.currentForm.panels.map((p: FormPanel) => {
      return $.div.w5.w_30.bgNearWhite.bLightSilver.ba.measure.h([
        $.div.pa3.bgBlack_05.h([
          $.div.f4.h([p.title]),
          $.div.f5.gray.h([p.subtitle]),
        ]),
      ]);
    }));
  } else {
    return $.div.flex.itemsStretch.h_100.h(["Error"]);
  }
};
