import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ServiceScope } from "@microsoft/sp-core-library";

export interface IPowerBiReactReportProps {
  webPartContext: WebPartContext;
  serviceScope: ServiceScope;
  defaultWorkspaceId: string;
  defaultReportId: string;
  defaultWidthToHeight: number;
  acctok: string;
}

export interface IPowerBiReactReportState {
  loading: boolean;
  workspaceId: string;
  reportId: string;
  widthToHeight: number;
  isOpen: boolean;
  height: string;
  width: string;
  zIndex: number;
  position: any;
  buttonZIndex: number;
  buttonPosition: any;
  maxi: boolean;
  iconName: string;
  buttonLabel: string;
}
