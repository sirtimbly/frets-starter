import { VNode, VNodeProperties } from "maquette";
import { $, $$ } from "../base-styles";

/**
 * Panel
 * @param nodes
 */
export const Panel = (isHoriz?: boolean,
                      title?: string,
                      properties?: VNodeProperties,
                      ...nodes: Array<string | VNode>): VNode => {
  let node = $.div.panel.bgWhite.shadow.smP1.p3.my2.rounded.leftAlign;
  const titleNode = $.div.h2.pb2.h([title || ""]);
  if (isHoriz) {
    if (title && title.length) {
      return node.leftAlign.h([
        titleNode,
        $.div.flex.alignMiddle.justifyCenter.h(nodes),
      ]);
    } else {
      node = node.flex.alignMiddle.justifyCenter;
    }
  }
  if (title) {
    nodes = [titleNode, ...nodes];
  }
  return node.h(properties, nodes);
};

export const VPanel = (title?: string, properties?: VNodeProperties, ...nodes: Array<string | VNode>): VNode => {
  return Panel(false, title, properties, ...nodes);
};

/**
 * Horizontal Flex Layout Panel
 * @param nodes;
 */
export const HPanel = (title?: string, properties?: VNodeProperties, ...nodes: Array<string | VNode>): VNode => {
  return Panel(true, title, properties, ...nodes);
};
