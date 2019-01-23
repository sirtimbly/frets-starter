
    import * as Maquette from "maquette";

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

        get h00() { return this.add("h00"); }
get h0() { return this.add("h0"); }
get h1() { return this.add("h1"); }
get h2() { return this.add("h2"); }
get h3() { return this.add("h3"); }
get h4() { return this.add("h4"); }
get h5() { return this.add("h5"); }
get h6() { return this.add("h6"); }
get fontFamilyInherit() { return this.add("font-family-inherit"); }
get fontSizeInherit() { return this.add("font-size-inherit"); }
get textDecorationNone() { return this.add("text-decoration-none"); }
get Bold() { return this.add("bold"); }
get regular() { return this.add("regular"); }
get italic() { return this.add("italic"); }
get caps() { return this.add("caps"); }
get leftAlign() { return this.add("left-align"); }
get center() { return this.add("center"); }
get rightAlign() { return this.add("right-align"); }
get justify() { return this.add("justify"); }
get nowrap() { return this.add("nowrap"); }
get breakWord() { return this.add("break-word"); }
get lineHeight_1() { return this.add("line-height-1"); }
get lineHeight_2() { return this.add("line-height-2"); }
get lineHeight_3() { return this.add("line-height-3"); }
get lineHeight_4() { return this.add("line-height-4"); }
get listStyleNone() { return this.add("list-style-none"); }
get underline() { return this.add("underline"); }
get truncate() { return this.add("truncate"); }
get listReset() { return this.add("list-reset"); }
get inline() { return this.add("inline"); }
get block() { return this.add("block"); }
get inlineBlock() { return this.add("inline-block"); }
get table() { return this.add("table"); }
get tableCell() { return this.add("table-cell"); }
get overflowHidden() { return this.add("overflow-hidden"); }
get overflowScroll() { return this.add("overflow-scroll"); }
get overflowAuto() { return this.add("overflow-auto"); }
get left() { return this.add("left"); }
get right() { return this.add("right"); }
get fit() { return this.add("fit"); }
get maxWidth_1() { return this.add("max-width-1"); }
get maxWidth_2() { return this.add("max-width-2"); }
get maxWidth_3() { return this.add("max-width-3"); }
get maxWidth_4() { return this.add("max-width-4"); }
get borderBox() { return this.add("border-box"); }
get alignBaseline() { return this.add("align-baseline"); }
get alignTop() { return this.add("align-top"); }
get alignMiddle() { return this.add("align-middle"); }
get alignBottom() { return this.add("align-bottom"); }
get col() { return this.add("col"); }
get colRight() { return this.add("col-right"); }
get col_1() { return this.add("col-1"); }
get col_2() { return this.add("col-2"); }
get col_3() { return this.add("col-3"); }
get col_4() { return this.add("col-4"); }
get col_5() { return this.add("col-5"); }
get col_6() { return this.add("col-6"); }
get col_7() { return this.add("col-7"); }
get col_8() { return this.add("col-8"); }
get col_9() { return this.add("col-9"); }
get col_10() { return this.add("col-10"); }
get col_11() { return this.add("col-11"); }
get col_12() { return this.add("col-12"); }
get smCol() { return this.add("sm-col"); }
get smColRight() { return this.add("sm-col-right"); }
get smCol_1() { return this.add("sm-col-1"); }
get smCol_2() { return this.add("sm-col-2"); }
get smCol_3() { return this.add("sm-col-3"); }
get smCol_4() { return this.add("sm-col-4"); }
get smCol_5() { return this.add("sm-col-5"); }
get smCol_6() { return this.add("sm-col-6"); }
get smCol_7() { return this.add("sm-col-7"); }
get smCol_8() { return this.add("sm-col-8"); }
get smCol_9() { return this.add("sm-col-9"); }
get smCol_10() { return this.add("sm-col-10"); }
get smCol_11() { return this.add("sm-col-11"); }
get smCol_12() { return this.add("sm-col-12"); }
get mdCol() { return this.add("md-col"); }
get mdColRight() { return this.add("md-col-right"); }
get mdCol_1() { return this.add("md-col-1"); }
get mdCol_2() { return this.add("md-col-2"); }
get mdCol_3() { return this.add("md-col-3"); }
get mdCol_4() { return this.add("md-col-4"); }
get mdCol_5() { return this.add("md-col-5"); }
get mdCol_6() { return this.add("md-col-6"); }
get mdCol_7() { return this.add("md-col-7"); }
get mdCol_8() { return this.add("md-col-8"); }
get mdCol_9() { return this.add("md-col-9"); }
get mdCol_10() { return this.add("md-col-10"); }
get mdCol_11() { return this.add("md-col-11"); }
get mdCol_12() { return this.add("md-col-12"); }
get lgCol() { return this.add("lg-col"); }
get lgColRight() { return this.add("lg-col-right"); }
get lgCol_1() { return this.add("lg-col-1"); }
get lgCol_2() { return this.add("lg-col-2"); }
get lgCol_3() { return this.add("lg-col-3"); }
get lgCol_4() { return this.add("lg-col-4"); }
get lgCol_5() { return this.add("lg-col-5"); }
get lgCol_6() { return this.add("lg-col-6"); }
get lgCol_7() { return this.add("lg-col-7"); }
get lgCol_8() { return this.add("lg-col-8"); }
get lgCol_9() { return this.add("lg-col-9"); }
get lgCol_10() { return this.add("lg-col-10"); }
get lgCol_11() { return this.add("lg-col-11"); }
get lgCol_12() { return this.add("lg-col-12"); }
get flex() { return this.add("flex"); }
get smFlex() { return this.add("sm-flex"); }
get mdFlex() { return this.add("md-flex"); }
get lgFlex() { return this.add("lg-flex"); }
get flexColumn() { return this.add("flex-column"); }
get flexWrap() { return this.add("flex-wrap"); }
get itemsStart() { return this.add("items-start"); }
get itemsEnd() { return this.add("items-end"); }
get itemsCenter() { return this.add("items-center"); }
get itemsBaseline() { return this.add("items-baseline"); }
get itemsStretch() { return this.add("items-stretch"); }
get selfStart() { return this.add("self-start"); }
get selfEnd() { return this.add("self-end"); }
get selfCenter() { return this.add("self-center"); }
get selfBaseline() { return this.add("self-baseline"); }
get selfStretch() { return this.add("self-stretch"); }
get justifyStart() { return this.add("justify-start"); }
get justifyEnd() { return this.add("justify-end"); }
get justifyCenter() { return this.add("justify-center"); }
get justifyBetween() { return this.add("justify-between"); }
get justifyAround() { return this.add("justify-around"); }
get justifyEvenly() { return this.add("justify-evenly"); }
get contentStart() { return this.add("content-start"); }
get contentEnd() { return this.add("content-end"); }
get contentCenter() { return this.add("content-center"); }
get contentBetween() { return this.add("content-between"); }
get contentAround() { return this.add("content-around"); }
get contentStretch() { return this.add("content-stretch"); }
get flexAuto() { return this.add("flex-auto"); }
get flexNone() { return this.add("flex-none"); }
get order_0() { return this.add("order-0"); }
get order_1() { return this.add("order-1"); }
get order_2() { return this.add("order-2"); }
get order_3() { return this.add("order-3"); }
get orderLast() { return this.add("order-last"); }
get relative() { return this.add("relative"); }
get absolute() { return this.add("absolute"); }
get Fixed() { return this.add("fixed"); }
get top_0() { return this.add("top-0"); }
get right_0() { return this.add("right-0"); }
get bottom_0() { return this.add("bottom-0"); }
get left_0() { return this.add("left-0"); }
get z1() { return this.add("z1"); }
get z2() { return this.add("z2"); }
get z3() { return this.add("z3"); }
get z4() { return this.add("z4"); }
get border() { return this.add("border"); }
get borderTop() { return this.add("border-top"); }
get borderRight() { return this.add("border-right"); }
get borderBottom() { return this.add("border-bottom"); }
get borderLeft() { return this.add("border-left"); }
get borderNone() { return this.add("border-none"); }
get rounded() { return this.add("rounded"); }
get circle() { return this.add("circle"); }
get roundedTop() { return this.add("rounded-top"); }
get roundedRight() { return this.add("rounded-right"); }
get roundedBottom() { return this.add("rounded-bottom"); }
get roundedLeft() { return this.add("rounded-left"); }
get notRounded() { return this.add("not-rounded"); }
get hide() { return this.add("hide"); }
get xsHide() { return this.add("xs-hide"); }
get smHide() { return this.add("sm-hide"); }
get mdHide() { return this.add("md-hide"); }
get lgHide() { return this.add("lg-hide"); }
get displayNone() { return this.add("display-none"); }
get m0() { return this.add("m0"); }
get mt0() { return this.add("mt0"); }
get mr0() { return this.add("mr0"); }
get mb0() { return this.add("mb0"); }
get ml0() { return this.add("ml0"); }
get mx0() { return this.add("mx0"); }
get my0() { return this.add("my0"); }
get m1() { return this.add("m1"); }
get mt1() { return this.add("mt1"); }
get mr1() { return this.add("mr1"); }
get mb1() { return this.add("mb1"); }
get ml1() { return this.add("ml1"); }
get mx1() { return this.add("mx1"); }
get my1() { return this.add("my1"); }
get m2() { return this.add("m2"); }
get mt2() { return this.add("mt2"); }
get mr2() { return this.add("mr2"); }
get mb2() { return this.add("mb2"); }
get ml2() { return this.add("ml2"); }
get mx2() { return this.add("mx2"); }
get my2() { return this.add("my2"); }
get m3() { return this.add("m3"); }
get mt3() { return this.add("mt3"); }
get mr3() { return this.add("mr3"); }
get mb3() { return this.add("mb3"); }
get ml3() { return this.add("ml3"); }
get mx3() { return this.add("mx3"); }
get my3() { return this.add("my3"); }
get m4() { return this.add("m4"); }
get mt4() { return this.add("mt4"); }
get mr4() { return this.add("mr4"); }
get mb4() { return this.add("mb4"); }
get ml4() { return this.add("ml4"); }
get mx4() { return this.add("mx4"); }
get my4() { return this.add("my4"); }
get mxn1() { return this.add("mxn1"); }
get mxn2() { return this.add("mxn2"); }
get mxn3() { return this.add("mxn3"); }
get mxn4() { return this.add("mxn4"); }
get mAuto() { return this.add("m-auto"); }
get mtAuto() { return this.add("mt-auto"); }
get mrAuto() { return this.add("mr-auto"); }
get mbAuto() { return this.add("mb-auto"); }
get mlAuto() { return this.add("ml-auto"); }
get mxAuto() { return this.add("mx-auto"); }
get myAuto() { return this.add("my-auto"); }
get p0() { return this.add("p0"); }
get pt0() { return this.add("pt0"); }
get pr0() { return this.add("pr0"); }
get pb0() { return this.add("pb0"); }
get pl0() { return this.add("pl0"); }
get px0() { return this.add("px0"); }
get py0() { return this.add("py0"); }
get p1() { return this.add("p1"); }
get pt1() { return this.add("pt1"); }
get pr1() { return this.add("pr1"); }
get pb1() { return this.add("pb1"); }
get pl1() { return this.add("pl1"); }
get py1() { return this.add("py1"); }
get px1() { return this.add("px1"); }
get p2() { return this.add("p2"); }
get pt2() { return this.add("pt2"); }
get pr2() { return this.add("pr2"); }
get pb2() { return this.add("pb2"); }
get pl2() { return this.add("pl2"); }
get py2() { return this.add("py2"); }
get px2() { return this.add("px2"); }
get p3() { return this.add("p3"); }
get pt3() { return this.add("pt3"); }
get pr3() { return this.add("pr3"); }
get pb3() { return this.add("pb3"); }
get pl3() { return this.add("pl3"); }
get py3() { return this.add("py3"); }
get px3() { return this.add("px3"); }
get p4() { return this.add("p4"); }
get pt4() { return this.add("pt4"); }
get pr4() { return this.add("pr4"); }
get pb4() { return this.add("pb4"); }
get pl4() { return this.add("pl4"); }
get py4() { return this.add("py4"); }
get px4() { return this.add("px4"); }
get smM0() { return this.add("sm-m0"); }
get smMt0() { return this.add("sm-mt0"); }
get smMr0() { return this.add("sm-mr0"); }
get smMb0() { return this.add("sm-mb0"); }
get smMl0() { return this.add("sm-ml0"); }
get smMx0() { return this.add("sm-mx0"); }
get smMy0() { return this.add("sm-my0"); }
get smM1() { return this.add("sm-m1"); }
get smMt1() { return this.add("sm-mt1"); }
get smMr1() { return this.add("sm-mr1"); }
get smMb1() { return this.add("sm-mb1"); }
get smMl1() { return this.add("sm-ml1"); }
get smMx1() { return this.add("sm-mx1"); }
get smMy1() { return this.add("sm-my1"); }
get smM2() { return this.add("sm-m2"); }
get smMt2() { return this.add("sm-mt2"); }
get smMr2() { return this.add("sm-mr2"); }
get smMb2() { return this.add("sm-mb2"); }
get smMl2() { return this.add("sm-ml2"); }
get smMx2() { return this.add("sm-mx2"); }
get smMy2() { return this.add("sm-my2"); }
get smM3() { return this.add("sm-m3"); }
get smMt3() { return this.add("sm-mt3"); }
get smMr3() { return this.add("sm-mr3"); }
get smMb3() { return this.add("sm-mb3"); }
get smMl3() { return this.add("sm-ml3"); }
get smMx3() { return this.add("sm-mx3"); }
get smMy3() { return this.add("sm-my3"); }
get smM4() { return this.add("sm-m4"); }
get smMt4() { return this.add("sm-mt4"); }
get smMr4() { return this.add("sm-mr4"); }
get smMb4() { return this.add("sm-mb4"); }
get smMl4() { return this.add("sm-ml4"); }
get smMx4() { return this.add("sm-mx4"); }
get smMy4() { return this.add("sm-my4"); }
get smMxn1() { return this.add("sm-mxn1"); }
get smMxn2() { return this.add("sm-mxn2"); }
get smMxn3() { return this.add("sm-mxn3"); }
get smMxn4() { return this.add("sm-mxn4"); }
get smMlAuto() { return this.add("sm-ml-auto"); }
get smMrAuto() { return this.add("sm-mr-auto"); }
get smMxAuto() { return this.add("sm-mx-auto"); }
get mdM0() { return this.add("md-m0"); }
get mdMt0() { return this.add("md-mt0"); }
get mdMr0() { return this.add("md-mr0"); }
get mdMb0() { return this.add("md-mb0"); }
get mdMl0() { return this.add("md-ml0"); }
get mdMx0() { return this.add("md-mx0"); }
get mdMy0() { return this.add("md-my0"); }
get mdM1() { return this.add("md-m1"); }
get mdMt1() { return this.add("md-mt1"); }
get mdMr1() { return this.add("md-mr1"); }
get mdMb1() { return this.add("md-mb1"); }
get mdMl1() { return this.add("md-ml1"); }
get mdMx1() { return this.add("md-mx1"); }
get mdMy1() { return this.add("md-my1"); }
get mdM2() { return this.add("md-m2"); }
get mdMt2() { return this.add("md-mt2"); }
get mdMr2() { return this.add("md-mr2"); }
get mdMb2() { return this.add("md-mb2"); }
get mdMl2() { return this.add("md-ml2"); }
get mdMx2() { return this.add("md-mx2"); }
get mdMy2() { return this.add("md-my2"); }
get mdM3() { return this.add("md-m3"); }
get mdMt3() { return this.add("md-mt3"); }
get mdMr3() { return this.add("md-mr3"); }
get mdMb3() { return this.add("md-mb3"); }
get mdMl3() { return this.add("md-ml3"); }
get mdMx3() { return this.add("md-mx3"); }
get mdMy3() { return this.add("md-my3"); }
get mdM4() { return this.add("md-m4"); }
get mdMt4() { return this.add("md-mt4"); }
get mdMr4() { return this.add("md-mr4"); }
get mdMb4() { return this.add("md-mb4"); }
get mdMl4() { return this.add("md-ml4"); }
get mdMx4() { return this.add("md-mx4"); }
get mdMy4() { return this.add("md-my4"); }
get mdMxn1() { return this.add("md-mxn1"); }
get mdMxn2() { return this.add("md-mxn2"); }
get mdMxn3() { return this.add("md-mxn3"); }
get mdMxn4() { return this.add("md-mxn4"); }
get mdMlAuto() { return this.add("md-ml-auto"); }
get mdMrAuto() { return this.add("md-mr-auto"); }
get mdMxAuto() { return this.add("md-mx-auto"); }
get lgM0() { return this.add("lg-m0"); }
get lgMt0() { return this.add("lg-mt0"); }
get lgMr0() { return this.add("lg-mr0"); }
get lgMb0() { return this.add("lg-mb0"); }
get lgMl0() { return this.add("lg-ml0"); }
get lgMx0() { return this.add("lg-mx0"); }
get lgMy0() { return this.add("lg-my0"); }
get lgM1() { return this.add("lg-m1"); }
get lgMt1() { return this.add("lg-mt1"); }
get lgMr1() { return this.add("lg-mr1"); }
get lgMb1() { return this.add("lg-mb1"); }
get lgMl1() { return this.add("lg-ml1"); }
get lgMx1() { return this.add("lg-mx1"); }
get lgMy1() { return this.add("lg-my1"); }
get lgM2() { return this.add("lg-m2"); }
get lgMt2() { return this.add("lg-mt2"); }
get lgMr2() { return this.add("lg-mr2"); }
get lgMb2() { return this.add("lg-mb2"); }
get lgMl2() { return this.add("lg-ml2"); }
get lgMx2() { return this.add("lg-mx2"); }
get lgMy2() { return this.add("lg-my2"); }
get lgM3() { return this.add("lg-m3"); }
get lgMt3() { return this.add("lg-mt3"); }
get lgMr3() { return this.add("lg-mr3"); }
get lgMb3() { return this.add("lg-mb3"); }
get lgMl3() { return this.add("lg-ml3"); }
get lgMx3() { return this.add("lg-mx3"); }
get lgMy3() { return this.add("lg-my3"); }
get lgM4() { return this.add("lg-m4"); }
get lgMt4() { return this.add("lg-mt4"); }
get lgMr4() { return this.add("lg-mr4"); }
get lgMb4() { return this.add("lg-mb4"); }
get lgMl4() { return this.add("lg-ml4"); }
get lgMx4() { return this.add("lg-mx4"); }
get lgMy4() { return this.add("lg-my4"); }
get lgMxn1() { return this.add("lg-mxn1"); }
get lgMxn2() { return this.add("lg-mxn2"); }
get lgMxn3() { return this.add("lg-mxn3"); }
get lgMxn4() { return this.add("lg-mxn4"); }
get lgMlAuto() { return this.add("lg-ml-auto"); }
get lgMrAuto() { return this.add("lg-mr-auto"); }
get lgMxAuto() { return this.add("lg-mx-auto"); }
get smP0() { return this.add("sm-p0"); }
get smPt0() { return this.add("sm-pt0"); }
get smPr0() { return this.add("sm-pr0"); }
get smPb0() { return this.add("sm-pb0"); }
get smPl0() { return this.add("sm-pl0"); }
get smPx0() { return this.add("sm-px0"); }
get smPy0() { return this.add("sm-py0"); }
get smP1() { return this.add("sm-p1"); }
get smPt1() { return this.add("sm-pt1"); }
get smPr1() { return this.add("sm-pr1"); }
get smPb1() { return this.add("sm-pb1"); }
get smPl1() { return this.add("sm-pl1"); }
get smPx1() { return this.add("sm-px1"); }
get smPy1() { return this.add("sm-py1"); }
get smP2() { return this.add("sm-p2"); }
get smPt2() { return this.add("sm-pt2"); }
get smPr2() { return this.add("sm-pr2"); }
get smPb2() { return this.add("sm-pb2"); }
get smPl2() { return this.add("sm-pl2"); }
get smPx2() { return this.add("sm-px2"); }
get smPy2() { return this.add("sm-py2"); }
get smP3() { return this.add("sm-p3"); }
get smPt3() { return this.add("sm-pt3"); }
get smPr3() { return this.add("sm-pr3"); }
get smPb3() { return this.add("sm-pb3"); }
get smPl3() { return this.add("sm-pl3"); }
get smPx3() { return this.add("sm-px3"); }
get smPy3() { return this.add("sm-py3"); }
get smP4() { return this.add("sm-p4"); }
get smPt4() { return this.add("sm-pt4"); }
get smPr4() { return this.add("sm-pr4"); }
get smPb4() { return this.add("sm-pb4"); }
get smPl4() { return this.add("sm-pl4"); }
get smPx4() { return this.add("sm-px4"); }
get smPy4() { return this.add("sm-py4"); }
get mdP0() { return this.add("md-p0"); }
get mdPt0() { return this.add("md-pt0"); }
get mdPr0() { return this.add("md-pr0"); }
get mdPb0() { return this.add("md-pb0"); }
get mdPl0() { return this.add("md-pl0"); }
get mdPx0() { return this.add("md-px0"); }
get mdPy0() { return this.add("md-py0"); }
get mdP1() { return this.add("md-p1"); }
get mdPt1() { return this.add("md-pt1"); }
get mdPr1() { return this.add("md-pr1"); }
get mdPb1() { return this.add("md-pb1"); }
get mdPl1() { return this.add("md-pl1"); }
get mdPx1() { return this.add("md-px1"); }
get mdPy1() { return this.add("md-py1"); }
get mdP2() { return this.add("md-p2"); }
get mdPt2() { return this.add("md-pt2"); }
get mdPr2() { return this.add("md-pr2"); }
get mdPb2() { return this.add("md-pb2"); }
get mdPl2() { return this.add("md-pl2"); }
get mdPx2() { return this.add("md-px2"); }
get mdPy2() { return this.add("md-py2"); }
get mdP3() { return this.add("md-p3"); }
get mdPt3() { return this.add("md-pt3"); }
get mdPr3() { return this.add("md-pr3"); }
get mdPb3() { return this.add("md-pb3"); }
get mdPl3() { return this.add("md-pl3"); }
get mdPx3() { return this.add("md-px3"); }
get mdPy3() { return this.add("md-py3"); }
get mdP4() { return this.add("md-p4"); }
get mdPt4() { return this.add("md-pt4"); }
get mdPr4() { return this.add("md-pr4"); }
get mdPb4() { return this.add("md-pb4"); }
get mdPl4() { return this.add("md-pl4"); }
get mdPx4() { return this.add("md-px4"); }
get mdPy4() { return this.add("md-py4"); }
get lgP0() { return this.add("lg-p0"); }
get lgPt0() { return this.add("lg-pt0"); }
get lgPr0() { return this.add("lg-pr0"); }
get lgPb0() { return this.add("lg-pb0"); }
get lgPl0() { return this.add("lg-pl0"); }
get lgPx0() { return this.add("lg-px0"); }
get lgPy0() { return this.add("lg-py0"); }
get lgP1() { return this.add("lg-p1"); }
get lgPt1() { return this.add("lg-pt1"); }
get lgPr1() { return this.add("lg-pr1"); }
get lgPb1() { return this.add("lg-pb1"); }
get lgPl1() { return this.add("lg-pl1"); }
get lgPx1() { return this.add("lg-px1"); }
get lgPy1() { return this.add("lg-py1"); }
get lgP2() { return this.add("lg-p2"); }
get lgPt2() { return this.add("lg-pt2"); }
get lgPr2() { return this.add("lg-pr2"); }
get lgPb2() { return this.add("lg-pb2"); }
get lgPl2() { return this.add("lg-pl2"); }
get lgPx2() { return this.add("lg-px2"); }
get lgPy2() { return this.add("lg-py2"); }
get lgP3() { return this.add("lg-p3"); }
get lgPt3() { return this.add("lg-pt3"); }
get lgPr3() { return this.add("lg-pr3"); }
get lgPb3() { return this.add("lg-pb3"); }
get lgPl3() { return this.add("lg-pl3"); }
get lgPx3() { return this.add("lg-px3"); }
get lgPy3() { return this.add("lg-py3"); }
get lgP4() { return this.add("lg-p4"); }
get lgPt4() { return this.add("lg-pt4"); }
get lgPr4() { return this.add("lg-pr4"); }
get lgPb4() { return this.add("lg-pb4"); }
get lgPl4() { return this.add("lg-pl4"); }
get lgPx4() { return this.add("lg-px4"); }
get lgPy4() { return this.add("lg-py4"); }
get btn() { return this.add("btn"); }
get btnPrimary() { return this.add("btn-primary"); }
get btnOutline() { return this.add("btn-outline"); }
get btnSmall() { return this.add("btn-small"); }
get btnBig() { return this.add("btn-big"); }
get btnNarrow() { return this.add("btn-narrow"); }
get black() { return this.add("black"); }
get gray() { return this.add("gray"); }
get silver() { return this.add("silver"); }
get white() { return this.add("white"); }
get aqua() { return this.add("aqua"); }
get blue() { return this.add("blue"); }
get navy() { return this.add("navy"); }
get teal() { return this.add("teal"); }
get green() { return this.add("green"); }
get olive() { return this.add("olive"); }
get lime() { return this.add("lime"); }
get yellow() { return this.add("yellow"); }
get orange() { return this.add("orange"); }
get red() { return this.add("red"); }
get fuchsia() { return this.add("fuchsia"); }
get purple() { return this.add("purple"); }
get maroon() { return this.add("maroon"); }
get colorInherit() { return this.add("color-inherit"); }
get muted() { return this.add("muted"); }
get bgBlack() { return this.add("bg-black"); }
get bgGray() { return this.add("bg-gray"); }
get bgSilver() { return this.add("bg-silver"); }
get bgWhite() { return this.add("bg-white"); }
get bgAqua() { return this.add("bg-aqua"); }
get bgBlue() { return this.add("bg-blue"); }
get bgNavy() { return this.add("bg-navy"); }
get bgTeal() { return this.add("bg-teal"); }
get bgGreen() { return this.add("bg-green"); }
get bgOlive() { return this.add("bg-olive"); }
get bgLime() { return this.add("bg-lime"); }
get bgYellow() { return this.add("bg-yellow"); }
get bgOrange() { return this.add("bg-orange"); }
get bgRed() { return this.add("bg-red"); }
get bgFuchsia() { return this.add("bg-fuchsia"); }
get bgPurple() { return this.add("bg-purple"); }
get bgMaroon() { return this.add("bg-maroon"); }
get borderBlack() { return this.add("border-black"); }
get borderGray() { return this.add("border-gray"); }
get borderSilver() { return this.add("border-silver"); }
get borderWhite() { return this.add("border-white"); }
get borderAqua() { return this.add("border-aqua"); }
get borderBlue() { return this.add("border-blue"); }
get borderNavy() { return this.add("border-navy"); }
get borderTeal() { return this.add("border-teal"); }
get borderGreen() { return this.add("border-green"); }
get borderOlive() { return this.add("border-olive"); }
get borderLime() { return this.add("border-lime"); }
get borderYellow() { return this.add("border-yellow"); }
get borderOrange() { return this.add("border-orange"); }
get borderRed() { return this.add("border-red"); }
get borderFuchsia() { return this.add("border-fuchsia"); }
get borderPurple() { return this.add("border-purple"); }
get borderMaroon() { return this.add("border-maroon"); }
get Select() { return this.add("select"); }
get Input() { return this.add("input"); }
get radioLg() { return this.add("radio-lg"); }
get weightInput() { return this.add("weight-input"); }
get textTransformNone() { return this.add("text-transform-none"); }
get drinkForm() { return this.add("drink-form"); }
get panel() { return this.add("panel"); }
get panelPanelH2() { return this.add("panel .panel .h2"); }
get btnBorder() { return this.add("btn.border"); }
get shadow() { return this.add("shadow"); }
get btnCircle() { return this.add("btn-circle"); }
get pill() { return this.add("pill"); }
get btnPill() { return this.add("btn-pill"); }
get littleCircle() { return this.add("little-circle"); }
get ordinalNav() { return this.add("ordinal-nav"); }
get markerCircle() { return this.add("marker-circle"); }
get stepsCover() { return this.add("steps-cover"); }
get step() { return this.add("step"); }
get absRight() { return this.add("abs-right"); }
get absLeft() { return this.add("abs-left"); }
get absFull() { return this.add("abs-full"); }
get absAlertTopRight() { return this.add("abs-alert-top-right"); }
get btnStep() { return this.add("btn-step"); }
get btnNext() { return this.add("btn-next"); }
get myData() { return this.add("my-data"); }
get lgFlexRow() { return this.add("lgFlexRow"); }
get fullWidthLg() { return this.add("full-width-lg"); }
get stateChooser() { return this.add("state-chooser"); }
get fullWidth() { return this.add("full-width"); }
get bgLightGray() { return this.add("bg-light-gray"); }
get lightGray() { return this.add("light-gray"); }
get bgLightBlue() { return this.add("bg-light-blue"); }
get lightBlue() { return this.add("light-blue"); }
get borderLightBlue() { return this.add("border-light-blue"); }
get bgGlass() { return this.add("bg-glass"); }

}

export const $$ = (selector?: string): BaseStyles =>  {
    return new BaseStyles("" + selector || "");
};

export const $ = $$();

