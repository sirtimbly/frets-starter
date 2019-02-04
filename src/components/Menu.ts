import { IFretsProps } from "frets";
import { VNode, VNodeProperties } from "frets";
import { SampleActions } from "../actions/SampleActions";
import { $, $$ } from "../base-styles";
import { SampleScreens, IKeyObject } from "../navigation";

export const MenuItem = (
  labelNodes: Array<string | VNode>,
  subNodes: Array<string | VNode>,
  isActive: boolean = false,
  clickFn: (e: Event) => boolean): VNode => {
    return $.div.my1.h([
      $.button.btn.p1.h6.gray.rounded.h({
        classes: $$().when(isActive).blue.Bold.toObj(),
        onclick: clickFn,
      },
        labelNodes),
      (subNodes) ? $.div.pl1.py1.h([subNodes]) : "",
    ]);
};

export const Menu = (
  keys: IKeyObject,
  props: IFretsProps<SampleScreens>,
  isHorizontal: boolean = false,
  actions: SampleActions): VNode => {
    const nodes = [];
    Object.keys(keys).forEach((x: SampleScreens) => {
      nodes.push(MenuItem([x], null, props.activeScreen === x, actions.nav[x]));
    });
    return $$("nav").mb1.mr2.h(nodes);
};
