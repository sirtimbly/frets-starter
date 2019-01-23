import { VNode, VNodeProperties } from "maquette";
import { $, $$ } from "../base-styles";

export interface IColumn {
  prop: string;
  label?: string;
}

/**
 * Table
 * @param nodes
 */
export const Table = (columns: IColumn[], data: any[] ): VNode => {
  const row = $$("tr");
  const cell = $$("td").borderBottom.borderRight.borderSilver.bgGray_600.p1;
  const header = $$("th").borderBottom.borderGray;
  if (!data || data.length <= 0) {
    return $$("table").collapse.h();
  }
  return $$("table").fullWidth.collapse.h([
    row.h(columns.map((c) => header.h([c.label]))),
    ...data.map((d) => row.h([
      ...columns.map((c) => {
        // debugger;
        return cell.h([ `${d[c.prop]}` ]);
      }),
    ])),
  ]);
};
