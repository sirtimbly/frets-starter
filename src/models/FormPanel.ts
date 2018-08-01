import FormMenu from "./FormMenu";
import FormItem from "./FormItem";

export class FormPanel {
  public templateId: string;
  public title: string;
  public closable: boolean = true;
  public subtitle: string;
  public listItems: FormItem[];
  public valid: boolean;
}
