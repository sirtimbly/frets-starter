import { $, $$ } from "../base-styles";
import { Icons } from "./Icons";

const baseNotification = $$("div").Fixed.absAlertTopRight.h5.block.p2.Bold.shadow.flex;

export const alert = (messages: string[]) => {
  return baseNotification.bgOrange.white.h([
    Icons.bell(), ...messages.map((s: string) => $.div.h({key: s}, [s])),
  ]);
};

export const success = (messages: string[]) => {
  return baseNotification.bgGreen.white.h([
    Icons.check(), ...messages.map((s: string) => $.div.h({key: s}, [s])),
  ]);
};
