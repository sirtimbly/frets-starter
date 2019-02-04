import * as just from "just-animate";
import { $, $$ } from "../base-styles";
import { Icons } from "./Icons";

const animateAlertIn = (domNode: Element, properties: any) => {
  just.animate({
    targets: domNode,
    duration: 412,
    web: {
      opacity: [0, 1],
      x: [300, 0],
    },
  }).play();
};

export const alert = (messages: string[]) => {
  const baseNotification = $.div.h5.block.p2.Bold.shadow.mb1.flex;
  return $.div.Fixed.absAlertTopRight.flexColumn.h(
    messages.map((s: string, index: number) => {
      return baseNotification.bgOrange.white.h({
        key: s,
        enterAnimation: animateAlertIn,
      }, [
        Icons.bell(),
        $.div.h([s]),
      ]);
    }),
  );
};

export const success = (messages: string[]) => {
  const baseNotification = $.div.h5.block.p2.Bold.shadow.flex;
  return baseNotification.bgGreen.white.h([
    Icons.check(), ...messages.map((s: string) => $.div.h({key: s}, [s])),
  ]);
};
