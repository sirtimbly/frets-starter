import { SampleActions } from "../actions/SampleActions";
import { $$ } from "../base-styles";
import AppProps from "../models/AppProps";
import { VPanel } from "./Panels";
import { App } from "../app";

export const renderAbout = ({modelProps, actions}: App) => VPanel("About FRETS", {},
  $$("p").gray.borderTop.pt2.h([`See the documentation online at`]),
  $$("a").h({
    href: "https://github.com/sirtimbly/frets",
    target: "_blank",
  }, ["github.com/sirtimbly/frets"]),
);
