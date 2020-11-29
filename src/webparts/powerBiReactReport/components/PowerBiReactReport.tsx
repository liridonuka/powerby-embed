import * as React from "react";
import styles from "./PowerBiReactReport.module.scss";
import {
  IPowerBiReactReportProps,
  IPowerBiReactReportState,
} from "./IPowerBiReactReportProps";
import { DefaultButton, IDefaultSlotProps } from "office-ui-fabric-react";
import {
  PowerBiWorkspace,
  PowerBiReport,
} from "./../../../models/PowerBiModels";
import {
  AadHttpClient,
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
  AadHttpClientFactory,
  AadTokenProvider,
} from "@microsoft/sp-http";
import * as pnp from "sp-pnp-js";
import { PowerBiService } from "./../../../services/PowerBiService";
import { PowerBiEmbeddingService } from "./../../../services/PowerBiEmbeddingService";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { sp } from "sp-pnp-js";
let guid;
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
    isOpen: false,
    height: "700px",
    width: "100%",
    zIndex: 0,
    position: "unset",
    buttonZIndex: 0,
    buttonPosition: "unset",
    maxi: false,
    iconName: "OpenInNewTab",
    buttonLabel: "Maximize",
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
    const mystyle = {
      iframe: {
        //border: "1px solid black",
        //borderStyle: "none",
        height: "700px",
      },
    };
    //console.log("PowerBiReactReport.render");
    return (
      <div className={styles.powerBiReactReport}>
        <div style={{ width: "100%" }}>
          {/* <div className={styles.column1}>
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
          </div> */}
          <div>
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
                //className={styles.embedContainer}
                className={styles.desktopView}
                style={{
                  zIndex: this.state.zIndex,
                  height: this.state.height,
                  width: this.state.width,
                  position: this.state.position,
                  left: 0,
                  top: 0,
                }}
              ></div>
            )}
          </div>
          <br />
          <div
            style={{
              zIndex: this.state.buttonZIndex,
              position: this.state.buttonPosition,
              right: 5,
              top: 5,
            }}
          >
            <DefaultButton
              onClick={() => this.setDiv()}
              title={this.state.buttonLabel}
              iconProps={{ iconName: this.state.iconName }}
            />
          </div>
        </div>
        {/* <div className={styles.powerBiReactReport}>
          <Panel
            onOpened={() => this.embedReport("embed-container1")}
            isOpen={this.state.isOpen}
            onDismiss={() => this.setState({ isOpen: false })}
            type={PanelType.smallFluid}
            closeButtonAriaLabel="Close"
          >
            <div
              id="embed-container1"
              //className={styles.embedContainer}
              //className={styles.desktopView}
              style={mystyle.iframe}
            ></div>
          </Panel>
        </div> */}
      </div>
    );
  }

  private setDiv() {
    if (!this.state.maxi) {
      this.setState({
        height: "100%",
        width: "100%",
        zIndex: 9999,
        position: "fixed",
        buttonZIndex: 9999,
        buttonPosition: "fixed",
        maxi: true,
        iconName: "ChromeClose",
        buttonLabel: "Close",
      });
    } else {
      this.setState({
        height: "700px",
        width: "100%",
        zIndex: 0,
        position: "unset",
        buttonZIndex: 0,
        buttonPosition: "unset",
        maxi: false,
        iconName: "OpenInNewTab",
        buttonLabel: "Maximize",
      });
    }
  }
  public componentDidMount() {
    console.log("componentDidUpdate");
    this.embedReport("embed-container");
  }

  // public componentDidUpdate(
  //   prevProps: IPowerBiReactReportProps,
  //   prevState: IPowerBiReactReportState,
  //   prevContext: any
  // ): void {
  //   console.log("componentDidUpdate");
  //   this.embedReport("embed-container");
  // }

  private embedReport(embedContainer) {
    this.adToken().then((i) => {
      let embedTarget: HTMLElement = document.getElementById(embedContainer);
      if (!this.state.loading && !this.reportCannotRender()) {
        PowerBiService.GetReport(
          i,
          this.props.serviceScope,
          this.state.workspaceId,
          this.state.reportId
        ).then((report: PowerBiReport) => {
          PowerBiEmbeddingService.embedReport(report, embedTarget);
        });
      }
    });
  }

  // private async getITem() {
  //   pnp.setup({ spfxContext: this.props.webPartContext });
  //   const item: any[] = await pnp.sp.web.lists
  //     .getByTitle("Experimental")
  //     .items.select("Title", "act")
  //     .filter("Title eq 'NNN'")
  //     .getAll();

  //   return item.map((i) => i.act);
  // }

  private adToken(): Promise<any> {
    return this.props.webPartContext.aadTokenProviderFactory
      .getTokenProvider()
      .then(
        (tokenProvider: AadTokenProvider): Promise<string> => {
          return tokenProvider.getToken(
            "https://analysis.windows.net/powerbi/api"
          );
        }
      );
  }
}
