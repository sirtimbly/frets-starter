import { $, $$ } from "../../app-styles";

import { IFretsProps } from "frets";
import { VNode, VNodeChild, VNodeProperties } from "maquette";
import { SampleActions } from "../../actions/SampleActions";
import { SampleScreens } from "../../models/AppProps";

const base = $$("input.hover-bg-washed-blue.bg-animate").br1.ba.bgWhite.nearBlack.bGray.bSolid.pa2.mv1;

export const Input = (label: string, properties?: VNodeProperties, children?: VNodeChild[]) => {
  return $.div.pa1.h([
    $.label.pv2.b.h([label]),
    base.w_100.h(properties, children),
  ]);
};
