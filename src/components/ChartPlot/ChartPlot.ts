import { FRETS } from "frets";
import { SampleActions } from "../../actions/SampleActions";
import { $, $$ } from "../../app-styles";
import AppProps from "../../models/AppProps";

const width: number = 400;

export function ChartPlot(app: FRETS<AppProps, SampleActions>) {
  const xAxis = app.modelProps.axes[0];
  const yAxis = app.modelProps.axes[1];
  console.log(`Charting ${app.modelProps.items.length} items.`);
  return $.div.w_100.h_100.bgBlack_05.br2.ba.bBlack_20.relative.h({
    styles: {
      height: width + "px",
      width: width + "px",
    }
  },
    app.modelProps.items.map((item) => $.div.w2.bgRed.h2.ba.bWhite.pa1.white.absolute.h({
        key: item.name,
        styles: {
          bottom: getCoords(item.axisValues[yAxis.name]) + "px",
          left: getCoords(item.axisValues[xAxis.name]) + "px",
        },
      }, [ $.span.bgBlack_50.pa1.h([item.name]) ],
      )));
}

function getCoords(value: string): string {
  return (Number.parseInt(value, 10) * width / 100).toFixed(1);
}
