import { IFretsProps } from "frets";
import { VNode, VNodeProperties } from "maquette";
import { $, $$ } from "../app-styles";


export const icon = (name: string): VNode => {
  return $$("span.icon-" + name).h([""]);
};

export const Icons = {
  check: (): VNode => icon("ok"),
  ok: (): VNode => icon("ok"),
  refresh: (): VNode => icon("arrows-cw"),
  thumbsUp: (): VNode => icon("thumbs-up"),
  minus: (): VNode => icon("minus"),
  plus: (): VNode => icon("plus"),
};

/**
 * Panel
 * @param nodes
 */
export const Panel = (isHoriz?: boolean,
                      properties?: VNodeProperties,
                      ...nodes: Array<string | VNode>): VNode => {
  let node = $.div.bgWhite.pa3.mv2.ba.bBlack_025.br3.shadow_2;
  if (isHoriz) {
    node = node.flex.center.justifyCenter;
  }
  return node.h(properties, nodes);
};

/**
 * Horizontal Flex Layout Panel
 * @param nodes;
 */
export const HPanel = (properties?: VNodeProperties, ...nodes: Array<string | VNode>): VNode => {
  return Panel(true, properties, ...nodes);
};

export const MenuItem = (labelNodes: Array<string | VNode>,
                         subNodes: Array<string | VNode>,
                         isActive: boolean = false,
                         clickFn: (e: Event) => boolean): VNode => {
  return $.div.mv1.h([
    $.button.pa1.f5.gray.h({
      classes: $$().when(isActive).blue.toObj(),
      onclick: clickFn,
    },
    labelNodes),
    (subNodes) ? $.div.pl1.pv1.h([subNodes]) : "",
  ]);
};

