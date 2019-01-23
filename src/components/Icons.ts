import { VNode } from "maquette";
import { $$ } from "../base-styles";

export const icon = (name: string): VNode => {
  return $$("span.icon-" + name).h([""]);
};

export const Icons = {
  bell: (): VNode => icon("bell"),
  check: (): VNode => icon("ok"),
  minus: (): VNode => icon("minus"),
  ok: (): VNode => icon("ok"),
  plus: (): VNode => icon("plus"),
  refresh: (): VNode => icon("arrows-cw"),
  thumbsUp: (): VNode => icon("thumbs-up"),
};
