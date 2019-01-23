import { IFretsProps } from "frets";
import { VNode, VNodeProperties } from "maquette";
import { SampleActions } from "../actions/SampleActions";
import { $, $$ } from "../base-styles";
import { SampleScreens } from "../models/AppProps";

export const MenuItem = (labelNodes: Array<string | VNode>,
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

export const Menu = (props: IFretsProps<SampleScreens>,
                     isHorizontal: boolean = false,
                     actions: SampleActions): VNode => {
const nodes = [];
props.screens.forEach((x: SampleScreens) => {
nodes.push(MenuItem([SampleScreens[x]], null, props.activeScreen === x, actions.screenActions[x]));
});
return $$("nav").mb1.mr2.h(nodes);
};
