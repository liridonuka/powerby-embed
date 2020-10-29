import * as React from "react";
import styles from "./Buttons.module.scss";
import { IButtonsProps } from "./IButtonsProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class Buttons extends React.Component<IButtonsProps, {}> {
  public render(): React.ReactElement<IButtonsProps> {
    return (
      <div className={styles.buttons}>
        <div style={{ width: "90%" }}>
          <div className={styles.column1}>
            <a href={this.props.firstLink}>
              <img
                src="https://aralytiks.sharepoint.com/sites/Dupont/SiteAssets/DuPont%20Images/DuPont%20OurWay.png"
                alt="test"
              />
            </a>
          </div>
          <div className={styles.column2}>
            <a href={this.props.secondLink}>
              {" "}
              <img
                src="https://aralytiks.sharepoint.com/sites/Dupont/SiteAssets/DuPont%20Images/DuPont%20OurPurpose.png"
                alt="test"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
