import { $, $$ } from "../base-styles";

import { VNode } from "maquette";

import { FRETS } from "frets";
import { SampleActions } from "../actions/SampleActions";

import AppProps, { SampleScreens } from "../models/AppProps";
import { Menu } from "./Menu";
import { alert } from "./Notifications";
import { renderAbout } from "./UiAbout";
import { $grid } from "./UiAtoms";
import { renderHome } from "./UiHome";

export const renderRootView = (app: FRETS<AppProps, SampleActions> ): VNode => {
  const { modelProps: props, actions } = app;
  const idField = app.registerField<string>("id", "1");
  return $.div.flex.flexColumn.h([
    $.div.bgSilver.p2.borderBottom.borderGray.shadow.flex.justifyBetween.Bold.h([
      $.div.h(["My FRETS App"]),
    ]),
    alert(props.messages),
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
