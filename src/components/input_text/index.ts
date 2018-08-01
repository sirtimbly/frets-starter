import { $, $$ } from "../../app-styles";

import { VNode, VNodeChild, VNodeProperties } from "maquette";


const base = $$("input.hover-bg-washed-blue.bg-animate").bb.bgNearWhite.nearBlack.bGray.bSolid;

export const Input = (label: string, properties?: VNodeProperties, children?: VNodeChild[]) => {
  return $.div.pa1.h([
    $.label.pv2.b.h([label]),
    base.br0.pa2.mv1.w_100.h(properties, children),
  ]);
};

export const SmallInput = base.pa1.h;

export const CompoundInput = (properties?: VNodeProperties, children?: VNodeChild[]) => {
  const x = Object.assign($$(), base);
  return $.div.ma1.pl3.br2.ba.bgNearWhite.bLightSilver.flex.contentCenter.h([
    $.div.pa1.h({}, children),
    $$("input.hover-bg-washed-blue.bg-animate").bgTransparent.pa1.bb_0.bl.w5.bLightSilver.ml1.h(properties),
  ]);
};
