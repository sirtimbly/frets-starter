import { ActionsWithFields, IFretsProps } from "frets";
import { IRouteKeys, SampleScreens } from "../navigation";

type navAction = (e: Event) => boolean;

export class SampleActions extends ActionsWithFields {

  public navHome: navAction;
  public navAbout: navAction;
  public navUsers: navAction;
  public increment: navAction;
  public decrement: navAction;
  public loadUser: navAction;

  public screenActions: navAction[] = [];

  public nav: {[key in SampleScreens]?: navAction} = {};

}
