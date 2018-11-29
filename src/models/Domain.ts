
import { Axis } from "./Axis";
import { Item } from "./Item";
export class AppDomain {
  public Upsert<T>(collection: T[], key: string, newValue: any): T[] {
    const newCollection = [...collection];
    const foundLocation: number = newCollection.findIndex((i) => i[key] === newValue[key]);
    const oldValue = collection[foundLocation];
    const mergedValue = Object.assign(oldValue, newValue);
    newCollection.splice(foundLocation, (foundLocation >= 0 ? 1 : 0), newValue);
    return newCollection;
  }

}

export const FieldNames = {
  NewItemName: "NewItemName",
  GetItemFieldKey(name: string) {
    return "item-" + name;
  },
  GetItemAxisFieldKey(itemName: string, axisName: string) {
    return itemName + "-" + axisName;
  },
};

export interface IPayloadItem { Item?: Item; }
export interface IPayloadAxis { Axis?: Axis; }
