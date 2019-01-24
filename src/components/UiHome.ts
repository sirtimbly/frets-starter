import { $, $$ } from "../base-styles";

import { VNode } from "maquette";

import { FRETS } from "frets";
import { SampleActions } from "../actions/SampleActions";

import { IRegisteredField } from "frets/build/main/Frets";
import AppProps, { SampleScreens } from "../models/AppProps";
import { $grid } from "./UiAtoms";

import { Icons } from "./Icons";
import { HPanel, Panel, VPanel } from "./Panels";
import { Table } from "./Tables";

export const renderHome = (props: AppProps, actions: SampleActions, idField: IRegisteredField<string>) => {

  return VPanel("Example Frontend Application", {},
    $.div.leftAlign.pb2.h([
      $.p.p1.bgSilver.blue.h([
        Icons.thumbsUp(),
        "Demonstrates dynamic calculation, routing, async data, and validation."]),
    ]),
    HPanel("Simple Incrementer with Validation", { key: "incrementer" },
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
      $.div.h([$.div.lightBlue.rounded.mx1.p1.h2.h([props.timeCounter])]),
    ),
    HPanel("Async Fetching", { key: "fakeData"},
      $.label.m1.h([
        "Placeholder API User Id",
        $.a.btn.littleCircle.h({
          href:  "https://jsonplaceholder.typicode.com/",
          title: "https://jsonplaceholder.typicode.com/users/",
        }, ["?"]),
        $.input.maxWidth_1.h({
          onblur: idField.handler,
          onchange: idField.handler,
          onkeyup: (e: KeyboardEvent) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).parentElement.nextElementSibling.dispatchEvent(new Event("click"));
            }
          },
          type: "text",
          value: idField.value,
        }),
      ]),
      $.button.btn.btnPrimary.btnOutline.rounded.p1.m1.h({
        classes: $$().when(props.isLoading).bgGray.white.toObj(),
        disabled: props.isLoading,
        onclick: actions.loadUser,
      },
      [
          props.isLoading ? Icons.refresh() : Icons.ok(),
          "Fetch API Data",
      ]),
    ),
    VPanel("Data Results", {},
      $.div.rounded.p1.m1.h({
        class: !!props.user ? "green" : "gray",
      }, [
        "API Response",
        props.user ? Icons.ok() : " - Not Loaded",
      ]),
      props.user ?
      Table([
        { label: "Name", prop: "name"},
        { label: "Username", prop: "username"},
        { label: "E-Mail", prop: "email"},
        { label: "Id", prop: "id"},
        { label: "Phone", prop: "phone"},
        { label: "Website", prop: "website"},
      ], [props.user]) : "",
    ),
  );
};
