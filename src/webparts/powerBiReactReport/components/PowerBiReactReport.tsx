import * as React from "react";
import styles from "./PowerBiReactReport.module.scss";
import {
  IPowerBiReactReportProps,
  IPowerBiReactReportState,
} from "./IPowerBiReactReportProps";

import {
  PowerBiWorkspace,
  PowerBiReport,
} from "./../../../models/PowerBiModels";
import { PowerBiService } from "./../../../services/PowerBiService";
import { PowerBiEmbeddingService } from "./../../../services/PowerBiEmbeddingService";

export default class PowerBiReactReport extends React.Component<
  IPowerBiReactReportProps,
  IPowerBiReactReportState
> {
  constructor(props: IPowerBiReactReportProps) {
    super(props);
  }

  public state: IPowerBiReactReportState = {
    workspaceId: this.props.defaultWorkspaceId,
    reportId: this.props.defaultReportId,
    widthToHeight: this.props.defaultWidthToHeight,
    loading: false,
  };

  private reportCannotRender(): Boolean {
    return (
      this.state.workspaceId === undefined ||
      this.state.workspaceId === "" ||
      this.state.reportId === undefined ||
      this.state.reportId === ""
    );
  }

  public render(): React.ReactElement<IPowerBiReactReportProps> {
    let containerHeight =
      this.props.webPartContext.domElement.clientWidth /
      (this.state.widthToHeight / 100);

    console.log("PowerBiReactReport.render");
    return (
      <div className={styles.powerBiReactReport}>
        <div style={{ width: "100%" }}>
          <div className={styles.column1}>
            <div className={styles.navHeader}>Clocks</div>
            <ul>
              <li>Shangai</li>
              <li>Zaandam</li>
              <li>London</li>
              <li>Philadelphia</li>
            </ul>
            <div className={styles.navHeader}>Emergency Contacts</div>
            <ul>
              <li>Emergenct: 01382 76 3333</li>
              <li>Reception: 01382 76 3020 / 3019</li>
              <li>Security Office: 01382 76 3015</li>
            </ul>
            <div className={styles.navHeader}>Quick Linsks</div>
            <ul>
              <li>
                <a className={styles.links} href="#">
                  Homepage
                </a>
              </li>
              <li>
                <a className={styles.links} href="#">
                  OurPurpose
                </a>{" "}
              </li>
              <li>
                <a className={styles.links} href="#">
                  OurWay
                </a>{" "}
              </li>
              <li>
                <a className={styles.links} href="#">
                  Travel Desk
                </a>{" "}
              </li>
              <li>
                <a className={styles.links} href="#">
                  Rist Response
                </a>{" "}
              </li>
              <li>
                <a className={styles.links} href="#">
                  IT Service
                </a>{" "}
              </li>
            </ul>
          </div>
          <div className={styles.column2}>
            {this.state.loading ? (
              <div id="loading" className={styles.loadingContainer}>
                Calling to Power BI Service
              </div>
            ) : this.reportCannotRender() ? (
              <div id="message-container" className={styles.messageContainer}>
                Select a workspace and report from the web part property pane
              </div>
            ) : (
              <div
                id="embed-container"
                className={styles.embedContainer}
                style={{ height: containerHeight }}
              ></div>
            )}
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    console.log("componentDidUpdate");
    this.embedReport();
  }

  public componentDidUpdate(
    prevProps: IPowerBiReactReportProps,
    prevState: IPowerBiReactReportState,
    prevContext: any
  ): void {
    console.log("componentDidUpdate");
    this.embedReport();
  }

  private embedReport() {
    let embedTarget: HTMLElement = document.getElementById("embed-container");
    if (!this.state.loading && !this.reportCannotRender()) {
      // PowerBiService.GetReport(
      //   this.props.serviceScope,
      //   this.state.workspaceId,
      //   this.state.reportId
      // ).then((report: PowerBiReport) => {
      //   PowerBiEmbeddingService.embedReport(report, embedTarget);
      // });
    }
  }
}
