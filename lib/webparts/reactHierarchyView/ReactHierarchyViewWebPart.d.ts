import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
export interface IReactHierarchyViewWebPartProps {
    listName: string;
    selectedList: string;
}
export default class ReactHierarchyViewWebPart extends BaseClientSideWebPart<IReactHierarchyViewWebPartProps> {
    onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ReactHierarchyViewWebPart.d.ts.map