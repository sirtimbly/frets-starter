import { $, $$ } from "../../app-styles";

import { IFretsProps } from "frets";
import { VNode } from "maquette";
import { RootActions } from "../../actions/RootActions";
import { HortusScreens } from "../../models/AppProps";

export const MenuItem = (labelNodes: Array<string | VNode>,
  subNodes: Array<string | VNode>,
  isActive: boolean = false,
  clickFn: (e: Event) => boolean): VNode => {
  return $.div.mv1.h([
    $$("button.underline-hover").pa2.bgTransparent.bNone.f6.br2.h({
      classes: $$().when(isActive).lightestBlue.b.toObj(),
      onclick: clickFn,
    },
      labelNodes),
    (subNodes) ? $.div.pl1.pv1.h([subNodes]) : "",
  ]);
};

export const Menu = (props: IFretsProps<HortusScreens>,
  isHorizontal: boolean = false,
  actions: RootActions): VNode => {
  const nodes = [];
  if (props.screens) {

    props.screens.forEach((x: HortusScreens) => {
      nodes.push(MenuItem([HortusScreens[x]], null, props.activeScreen === x, actions.screenActions[x]));
    });
  }
  return $$("nav").mb1.mr2.h(nodes);
};
