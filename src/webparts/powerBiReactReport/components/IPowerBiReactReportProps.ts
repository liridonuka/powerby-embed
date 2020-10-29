import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { ServiceScope } from "@microsoft/sp-core-library";

export interface IPowerBiReactReportProps {
  webPartContext: IWebPartContext;
  serviceScope: ServiceScope;
  defaultWorkspaceId: string;
  defaultReportId: string;
  defaultWidthToHeight: number;
  guid: string;
}

export interface IPowerBiReactReportState {
  loading: boolean;
  workspaceId: string;
  reportId: string;
  widthToHeight: number;
  isOpen: boolean;
}
