import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  PropertyPaneTextField,
  IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import * as strings from "ButtonsWebPartStrings";
import Buttons from "./components/Buttons";
import { IButtonsProps } from "./components/IButtonsProps";

export default class ButtonsWebPart extends BaseClientSideWebPart<
  IButtonsProps
> {
  public render(): void {
    const element: React.ReactElement<IButtonsProps> = React.createElement(
      Buttons,
      {
        firstLink: this.properties.firstLink,
        secondLink: this.properties.secondLink,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("firstLink", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneTextField("secondLink", {
                  label: strings.DescriptionFieldLabel1,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
