import { IRegisteredField } from "frets/build/main/Frets";
import { $, $$ } from "../base-styles";

import { Icons } from "./Icons";
import { HPanel, Panel, VPanel } from "./Panels";
import { Table } from "./Tables";

import { App } from "../app";

type animationFn = (domNode: Element, properties: any) => void;

export const renderUsers = (app: App) => {
  const {modelProps: props, actions} = app;
  const idField: IRegisteredField<string> = app.registerField<string>("id", "1");
  return VPanel("Placeholder API Users", {},
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
      ], props.users) : "",
    ),
  );
};
