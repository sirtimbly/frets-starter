import { $, $$ } from "../base-styles";

import { VNode } from "maquette";

import { FRETS } from "frets";
import { SampleActions } from "../actions/SampleActions";

import { App } from "../app";
import AppProps from "../models/AppProps";
import { RouteKeys } from "../navigation";
import { Menu } from "./Menu";
import { alert } from "./Notifications";
import { renderAbout } from "./UiAbout";
import { $grid } from "./UiAtoms";
import { renderHome } from "./UiHome";
import { renderUsers } from "./Users";

export const renderRootView = (app: App ): VNode => {
  const { modelProps: props, actions } = app;
  let component: (app: App) => VNode;
  switch (props.activeScreen) {
    case RouteKeys.Home:
      component = renderHome;
      break;
    case RouteKeys.About:
      component = renderAbout;
      break;
    case RouteKeys.Users:
      component = renderUsers;
      break;
    default:
      break;
  }
  return $.div.flex.flexColumn.h([
    $.div.bgSilver.p2.borderBottom.borderGray.shadow.flex.justifyBetween.Bold.h([
      $.div.h(["My FRETS App"]),
    ]),
    alert(props.messages),
    $grid.h([
      $.div.col.col_2.smCol.smCol_12.pt2.h([Menu(RouteKeys, props, false, actions)]),
      $.div.col.col_10.smCol.smCol_12.px2.h([component(app)]),
    ]),
  ]);
};
