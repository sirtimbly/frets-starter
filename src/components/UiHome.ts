import { $, $$ } from "../base-styles";

import { Icons } from "./Icons";
import { HPanel, Panel, VPanel } from "./Panels";
import { Table } from "./Tables";

import * as just from "just-animate";

import { App } from "../app";

type animationFn = (domNode: Element, properties: any) => void;


const getAnimateCounter = (oldValue: string, newValue: string, up: boolean): animationFn => {
  const destination: number = up ? -20 : 20;
  const origin: number = up ? 20 : -20;

  return (domNode: Element, properties: any) => {
    // console.log("animate the counter");
    // debugger;
    just.sequence([{
      targets: domNode,
      duration: 256,
      web: {
        y: [0, destination],
        opacity: [1, 0],
      },
      props: {
        innerHTML: {
          value: [oldValue, oldValue],
        },
      },
    }, {
      targets: domNode,
      duration: 16,
      web: {
        y: [destination, origin],
      },
    }, {
      targets: domNode,
      duration: 256,
      web: {
        y: [origin, 0],
        opacity: [0, 1],
      },
      props: {
        innerHTML: {
          value: [oldValue, newValue],
        },
      },
    }]).play();
  };
};



export const renderHome = (app: App) => {
  const { modelProps: props, actions } = app;

  return VPanel("Example Frontend Application", {},
    $.div.leftAlign.pb2.h([
      $.p.p1.bgSilver.blue.h([
        Icons.thumbsUp(),
        "Demonstrates dynamic calculation, routing, async data, and validation."]),
    ]),
    HPanel("Simple Incrementer with Validation", { key: "incrementer" },
      $.div.p2.flex.nowrap.h([
        $.button.btn.btnOutline.h(
          {
            onclick: actions.decrement,
          },
          ["-"],
        ),
        $.button.btn.btnOutline.ml2.h(
          {
            onclick: actions.increment,
          },
          ["+"],
        ),
        $.div.bgLightGray.rounded.p1.mx1.h2.h([props.counter.toFixed() + " hours"]),
      ]),
      $.div.h([$.div.lightBlue.rounded.mx1.p1.h2.h({
        updateAnimation: getAnimateCounter(props.previousTime, props.timeCounter, props.counterIncreased),
      }, [props.timeCounter])]),
    ),
  );
};
