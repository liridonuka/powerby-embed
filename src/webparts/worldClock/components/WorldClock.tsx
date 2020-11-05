import * as React from "react";
import styles from "./WorldClock.module.scss";
import { IWorldClockProps } from "./IWorldClockProps";
import { escape } from "@microsoft/sp-lodash-subset";

// import strings from localized resources
import * as strings from "WorldClockWebPartStrings";

// import additional controls/components
import { Clock } from "./Clock";
import * as timeZones from "./Timezones";

export default class WorldClock extends React.Component<IWorldClockProps, {}> {
  public render(): React.ReactElement<IWorldClockProps> {
    return (
      <div className={styles.worldTime}>
        {/* <div className={styles.divHeader}>Clocks</div> */}
        {/* PLace/City Rows starts here */}
        {/* <div className={styles.divFull}>
          <div className={styles.firstColumn}>
            <img
              width="50px"
              height="38px"
              src="https://aralytiks.sharepoint.com/sites/Dupont/SiteAssets/DuPont%20Images/Flags/ukFlag.png"
              alt=""
            />
          </div>
          <div className={styles.secondColumn}>
            <div className={styles.description}>
              {this.props.description
                ? this.props.description
                : strings.LocalTimeDescription}
              London
            </div>
          </div>
          <div className={styles.thirdColumn}>
            <Clock
              timeZoneOffset={this.convertTimeZoneIdToOffset(
                this.props.timeZoneOffset
                48
              )}
            />
          </div>
        </div> */}
        <table className={styles.customers}>
          <tr>
            <th style={{ fontSize: "15px" }}>Clocks</th>
            <th></th>
          </tr>
          <tr>
            <td>
              <div className={styles.contentos}>
                <img
                  width="60px"
                  height="45px"
                  src="https://aralytiks.sharepoint.com/sites/Dupont/SiteAssets/DuPont%20Images/Flags/ukFlag.png"
                  alt=""
                />
                <p>London</p>
              </div>
            </td>
            <td>
              <Clock timeZoneOffset={this.convertTimeZoneIdToOffset(48)} />
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles.contentos}>
                <img
                  width="60px"
                  height="45px"
                  src="https://aralytiks.sharepoint.com/sites/Dupont/SiteAssets/DuPont%20Images/Flags/chinaFlag.png"
                  alt=""
                />
                <p>Shanghai</p>
              </div>
            </td>
            <td>
              <Clock timeZoneOffset={this.convertTimeZoneIdToOffset(136)} />
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles.contentos}>
                <img
                  width="60px"
                  height="45px"
                  src="https://aralytiks.sharepoint.com/sites/Dupont/SiteAssets/DuPont%20Images/Flags/netherlandsFlag.png"
                  alt=""
                />
                <p>Zanndam</p>
              </div>
            </td>
            <td>
              <Clock timeZoneOffset={this.convertTimeZoneIdToOffset(50)} />
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles.contentos}>
                <img
                  width="60px"
                  height="45px"
                  src="https://aralytiks.sharepoint.com/sites/Dupont/SiteAssets/DuPont%20Images/Flags/usaFlag.png"
                  alt=""
                />
                <p>Wilmington</p>
              </div>
            </td>
            <td>
              <Clock timeZoneOffset={this.convertTimeZoneIdToOffset(21)} />
            </td>
          </tr>
        </table>
      </div>
    );
  }

  // this method determines the minutes offset of the selected time zone
  private convertTimeZoneIdToOffset(id: number): number {
    let result: number = 0;

    const matchingItems: timeZones.ITimeZone[] = timeZones.TimeZones.zones.filter(
      (e: timeZones.ITimeZone, i: number) => {
        return e.id === id;
      }
    );

    if (matchingItems && matchingItems.length > 0) {
      result = matchingItems[0].offsetMinutes;
    }

    return result;
  }
}
