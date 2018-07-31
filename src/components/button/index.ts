import { $, $$ } from "../../app-styles";

import { IFretsProps } from "frets";
import { VNode, VNodeProperties } from "maquette";
import { SampleActions } from "../../actions/SampleActions";
import { SampleScreens } from "../../models/AppProps";

const baseButton = $$("button.hover-bg-washed-blue.bg-animate").br3.bgNearWhite.blue.bBlue.bSolid.pa2;

export const Button = baseButton.wAuto.ph3.h;

export const ExpandedButton = baseButton.w_100.h;
