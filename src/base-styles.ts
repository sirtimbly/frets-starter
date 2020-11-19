
  import {maquette as Maquette} from "frets";

    export default class BaseStyles {
        public chain: string[];
        public conditions: boolean[] = [];
        public classProps: any = {};
        private writeConditionIndex: number = 0;
        private readConditionIndex: number = 0;
        private classObjectMode: boolean = false;

        constructor(selector: string) {
            this.chain = new Array<string>();
            if (selector.length > 0) {
                this.chain.push(selector);
            }
            return this;
        }

        public when = (condition: boolean): BaseStyles => {
            this.classObjectMode = true;
            this.conditions[this.writeConditionIndex] = condition;
            return this;
        }

        public andWhen = (condition: boolean): BaseStyles => {
            this.classObjectMode = true;
            this.writeConditionIndex++;
            this.readConditionIndex++;
            return this.when(condition);

        }

        public otherwise = (): BaseStyles => {
            this.classObjectMode = true;
            return this.andWhen( !this.conditions[this.readConditionIndex]);
        }

        public h = (properties?: Maquette.VNodeProperties, children?: (string | Maquette.VNode | Maquette.VNodeChild)[]): Maquette.VNode => {
            if (this.classObjectMode) {
                throw Error("You can't build a vnode when you are using this for building a classes object");
            }
            if (properties && typeof properties === "object" && properties.length > 0) {
                return Maquette.h(this.toString(), properties);
            }
            return Maquette.h(this.toString(), properties, children);
        }

        public toObj = () => {
            if (!this.classObjectMode) {
                // tslint:disable-next-line:max-line-length
                throw Error("You need to call at least one conditional method in order to use this as a classes object generator");
            }
            return this.classProps;
        }

        get div(): BaseStyles { return new BaseStyles("div"); }
        get img(): BaseStyles { return new BaseStyles("img"); }
        get a(): BaseStyles { return new BaseStyles("a"); }
        get p(): BaseStyles { return new BaseStyles("p"); }
        get ul(): BaseStyles { return new BaseStyles("ul"); }
        get ol(): BaseStyles { return new BaseStyles("ol"); }
        get li(): BaseStyles { return new BaseStyles("li"); }
        get section(): BaseStyles { return new BaseStyles("section"); }
        get header(): BaseStyles { return new BaseStyles("header"); }
        get article(): BaseStyles { return new BaseStyles("article"); }
        get nav(): BaseStyles { return new BaseStyles("nav"); }
        get aside(): BaseStyles { return new BaseStyles("aside"); }
        get span(): BaseStyles { return new BaseStyles("span"); }
        get button(): BaseStyles { return new BaseStyles("button"); }
        get input(): BaseStyles { return new BaseStyles("input"); }
        get label(): BaseStyles { return new BaseStyles("label"); }
        get select(): BaseStyles { return new BaseStyles("select"); }
        get textarea(): BaseStyles { return new BaseStyles("textarea"); }

        public toString = (): string => {
            if (this.classObjectMode) {
                throw Error("You can't build a selector string when you are calling conditional methods");
            }
            if (this.chain.length === 1) {
                return this.chain[0] || "div";
            }
            return this.chain.join(".");
        }

        public $ = (className: string): BaseStyles => {
            return this.add(className);
        }

        public add = (className: string): BaseStyles => {
            if (this.classObjectMode) {
                this.classProps[className] = this.conditions[this.readConditionIndex];
            } else if (className.length > 0) {
                this.chain.push(className);
            }
            return this;
        }

        get h2() { return this.add("h2"); }
get h5() { return this.add("h5"); }
get h6() { return this.add("h6"); }
get Bold() { return this.add("bold"); }
get leftAlign() { return this.add("left-align"); }
get nowrap() { return this.add("nowrap"); }
get block() { return this.add("block"); }
get overflowAuto() { return this.add("overflow-auto"); }
get maxWidth_1() { return this.add("max-width-1"); }
get alignMiddle() { return this.add("align-middle"); }
get col() { return this.add("col"); }
get col_2() { return this.add("col-2"); }
get col_10() { return this.add("col-10"); }
get smCol() { return this.add("sm-col"); }
get smCol_12() { return this.add("sm-col-12"); }
get flex() { return this.add("flex"); }
get flexColumn() { return this.add("flex-column"); }
get justifyCenter() { return this.add("justify-center"); }
get justifyBetween() { return this.add("justify-between"); }
get Fixed() { return this.add("fixed"); }
get borderTop() { return this.add("border-top"); }
get borderRight() { return this.add("border-right"); }
get borderBottom() { return this.add("border-bottom"); }
get rounded() { return this.add("rounded"); }
get m1() { return this.add("m1"); }
get mb1() { return this.add("mb1"); }
get mx1() { return this.add("mx1"); }
get my1() { return this.add("my1"); }
get mr2() { return this.add("mr2"); }
get ml2() { return this.add("ml2"); }
get my2() { return this.add("my2"); }
get p1() { return this.add("p1"); }
get pl1() { return this.add("pl1"); }
get py1() { return this.add("py1"); }
get p2() { return this.add("p2"); }
get pt2() { return this.add("pt2"); }
get pb2() { return this.add("pb2"); }
get px2() { return this.add("px2"); }
get btn() { return this.add("btn"); }
get btnPrimary() { return this.add("btn-primary"); }
get btnOutline() { return this.add("btn-outline"); }
get gray() { return this.add("gray"); }
get white() { return this.add("white"); }
get blue() { return this.add("blue"); }
get green() { return this.add("green"); }
get bgGray() { return this.add("bg-gray"); }
get bgSilver() { return this.add("bg-silver"); }
get bgWhite() { return this.add("bg-white"); }
get bgGreen() { return this.add("bg-green"); }
get bgOrange() { return this.add("bg-orange"); }
get borderGray() { return this.add("border-gray"); }
get borderSilver() { return this.add("border-silver"); }
get borderGreen() { return this.add("border-green"); }
get panel() { return this.add("panel"); }
get panelPanel() { return this.add("panel .panel"); }
get panelPanelH2() { return this.add("panel .panel .h2"); }
get shadow() { return this.add("shadow"); }
get littleCircle() { return this.add("little-circle"); }
get absAlertTopRight() { return this.add("abs-alert-top-right"); }
get fadeIn() { return this.add("fade-in"); }
get fadeInActive() { return this.add("fade-in-active"); }
get fullWidth() { return this.add("full-width"); }
get bgLightGray() { return this.add("bg-light-gray"); }
get lightBlue() { return this.add("light-blue"); }
get bgGray600() { return this.add("bg-gray600"); }
get collapse() { return this.add("collapse"); }

}

export const $$ = (selector?: string): BaseStyles =>  {
    return new BaseStyles("" + selector || "");
};

export const $ = $$();

