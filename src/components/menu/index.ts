import { $, $$ } from "../../app-styles";

import { IFretsProps } from "frets";
import { VNode } from "maquette";
import { SampleActions } from "../../actions/SampleActions";
import { SampleScreens } from "../../models/AppProps";

export const MenuItem = (labelNodes: Array<string | VNode>,
  subNodes: Array<string | VNode>,
  isActive: boolean = false,
  clickFn: (e: Event) => boolean): VNode => {
  return $.div.mv1.h([
    $$("button.underline-hover").pa2.bgTransparent.bNone.f6.br2.h({
      classes: $$().when(isActive).blue.b.toObj(),
      onclick: clickFn,
    },
      labelNodes),
    (subNodes) ? $.div.pl1.pv1.h([subNodes]) : "",
  ]);
};

export const Menu = (props: IFretsProps<SampleScreens>,
  isHorizontal: boolean = false,
  actions: SampleActions): VNode => {
  const nodes = [];
  props.screens.forEach((x: SampleScreens) => {
    nodes.push(MenuItem([SampleScreens[x]], null, props.activeScreen === x, actions.screenActions[x]));
  });
  return $$("nav").mb1.mr2.h(nodes);
};
