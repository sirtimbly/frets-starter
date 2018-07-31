import { VNode } from "maquette";
import { $ } from "../../app-styles";

/**
 * Panel
 * @param nodes
 */
export const Panel = (nodes: Array<string | VNode>, isHoriz: boolean = false): VNode => {
  let node = $.div.bgWhite.bLightGray.ba.pa4.mv2.br2;
  if (isHoriz) {
    node = node.flex.justifyCenter;
  }
  return node.h(nodes);
};

/**
 * Horizontal Flex Layout Panel
 * @param nodes;
 */
export const HPanel = (nodes: Array<string | VNode>): VNode => {
  return Panel(nodes, true);
};
