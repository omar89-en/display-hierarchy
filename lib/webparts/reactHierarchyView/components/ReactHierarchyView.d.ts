import * as React from 'react';
import { IReactHierarchyViewProps } from './IReactHierarchyViewProps';
import 'react-orgchart/index.css';
import { ITreeItem } from "@pnp/spfx-controls-react/lib/TreeView";
export interface IReactHierarchyState {
    hierarchyItems: any;
    TreeLinks: ITreeItem[];
    isLoading: boolean;
    showErrorMessage: boolean;
    errorMessage: string;
}
export default class ReactHierarchyView extends React.Component<IReactHierarchyViewProps, IReactHierarchyState> {
    private HierarchyServiceInstance;
    constructor(props: IReactHierarchyViewProps);
    componentDidMount(): Promise<void>;
    componentWillReceiveProps(nextProps: IReactHierarchyViewProps): void;
    private loadHierarchyView;
    private loadHierarchytree;
    add(treearr: ITreeItem[], alltreearr: ITreeItem[]): void;
    render(): React.ReactElement<IReactHierarchyViewProps>;
    private onTreeItemSelect;
    private onTreeItemExpandCollapse;
    private renderCustomTreeItem;
    private MyNodeComponent;
}
//# sourceMappingURL=ReactHierarchyView.d.ts.map