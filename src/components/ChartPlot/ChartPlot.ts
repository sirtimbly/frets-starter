import { FRETS } from "frets";
import { SampleActions } from "../../actions/SampleActions";
import { $, $$ } from "../../app-styles";
import AppProps from "../../models/AppProps";

export function ChartPlot(app: FRETS<AppProps, SampleActions>) {
  const xAxis = app.modelProps.axes[0];
  const yAxis = app.modelProps.axes[1];
  return $.div.w_100.h_100.bgBlack_05.br2.ba.bBlack_20.relative.h({
    styles: {
      height: "400px",
      width: "400px",
    }
  },
    app.modelProps.items.map((item) => $.div.w2.bgRed.h2.ba.bWhite.pa3.white.absolute.h({
        styles: {
          bottom: getCoords(item.axisValues[yAxis.name]) + "px",
          left: getCoords(item.axisValues[xAxis.name]) + "px",
        },
      }, [ $.span.bgBlack_50.pa1.h([item.name]) ],
      )));
}

function getCoords(value: string): string {
  return (Number.parseInt(value, 10) * 4).toFixed(1);
}
