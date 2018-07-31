
import { VNode } from "maquette";
import { $, $$ } from "../base-styles";


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


