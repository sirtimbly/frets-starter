import { $, $$ } from "../../app-styles";

const baseButton = $$("button.hover-bg-washed-blue.bg-animate").br3.bgNearWhite.blue.bBlue.bSolid.pa2;

export const Button = baseButton.wAuto.ph3.h;
export const PillButton = $.button.ba.br_100.pa1.brPill.tc.dtc.vMid.pa2.h2.darkGray.bSilver.h;
export const ExpandedButton = baseButton.w_100.h;
