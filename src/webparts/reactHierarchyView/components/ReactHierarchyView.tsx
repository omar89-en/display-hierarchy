import * as React from 'react';
import styles from './ReactHierarchyView.module.scss';
import { IReactHierarchyViewProps } from './IReactHierarchyViewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IHierarchyService } from '../interfaces';
import { IHierarchyItem, Item } from '../interfaces/IHierarchyItem';

import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TreeView, ITreeItem, TreeViewSelectionMode, TreeItemActionsDisplayMode } from "@pnp/spfx-controls-react/lib/TreeView";
import { HierarchyService } from '../services';
import { MockHierarchyService } from '../mocks';
import { ServiceScope, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface IReactHierarchyState {
  hierarchyItems: any;
  TreeLinks: ITreeItem[];
  isLoading: boolean;
  showErrorMessage: boolean;
  errorMessage: string;
}

export default class ReactHierarchyView extends React.Component<IReactHierarchyViewProps, IReactHierarchyState> {
  private HierarchyServiceInstance: IHierarchyService;

  constructor(props: IReactHierarchyViewProps) {
    super(props);
    this.state = {
      TreeLinks: [],
      hierarchyItems: null,
      isLoading: true,
      showErrorMessage: false,
      errorMessage: ""
    };
  }

  public async componentDidMount() {
    this.loadHierarchyView(this.props.listName);
    this.loadHierarchytree(this.props.listName);
  }

  public componentWillReceiveProps(nextProps: IReactHierarchyViewProps) {
    this.loadHierarchyView(nextProps.listName);
    this.loadHierarchytree(nextProps.listName);
  }

  private loadHierarchyView(listName: string): void {
    let serviceScope: ServiceScope = this.props.serviceScope;

    // Based on the type of environment, return the correct instance of the IHierarchyServiceInstance interface
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      // Mapping to be used when webpart runs in SharePoint.
      this.HierarchyServiceInstance = serviceScope.consume(HierarchyService.serviceKey);
    }
    else {
      // This means webpart is running in the local workbench or from a unit test.
      // So we will need a non default implementation of the IHierarchyServiceInstance i.e. MockHierarchyService
      this.HierarchyServiceInstance = serviceScope.consume(MockHierarchyService.serviceKey);
    }

    this.HierarchyServiceInstance.getHierarchyInfo(listName).then((hierarchyItems: any) => {
      if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
        if (hierarchyItems.length > 0) {
          let hierarchyNodes: Array<Item> = [];
          var count: number;

          for (count = 0; count < hierarchyItems.length; count++) {
            hierarchyNodes.push(new Item(hierarchyItems[count].Id, hierarchyItems[count].Title, hierarchyItems[count].URL, hierarchyItems[count].Parent ? hierarchyItems[count].Parent.Id : undefined));
          }

          var arrayToTree: any = require('array-to-tree');
          var orgChartHierarchyNodes: any = arrayToTree(hierarchyNodes);

          var output: any = JSON.stringify(orgChartHierarchyNodes[0]);
          
          this.setState({
            hierarchyItems: JSON.parse(output),
            isLoading: false,
            showErrorMessage: false
          });
        }
        else {
          this.setState({
            hierarchyItems: [],
            isLoading: false,
            showErrorMessage: true,
            errorMessage: "No records to be displayed"
          });
         
        }
      }
      else {
        this.setState({
          hierarchyItems: JSON.parse(hierarchyItems),
          isLoading: false,
          showErrorMessage: false
        });
       
      }
    })
      .catch((error) =>
        this.setState({
          hierarchyItems: [],
          errorMessage: "Please verify web part configuration. Error details: " + error.message,
          isLoading: false,
          showErrorMessage: true
        })
      );
      
  }

  private loadHierarchytree(listName: string): void {
    let serviceScope: ServiceScope = this.props.serviceScope;
    var alltreearr: ITreeItem[] = [];
    var treearr: ITreeItem[] = [];
    var array: ITreeItem[] = [];
    // Based on the type of environment, return the correct instance of the IHierarchyServiceInstance interface
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      // Mapping to be used when webpart runs in SharePoint.
      this.HierarchyServiceInstance = serviceScope.consume(HierarchyService.serviceKey);
    }
    else {
      // This means webpart is running in the local workbench or from a unit test.
      // So we will need a non default implementation of the IHierarchyServiceInstance i.e. MockHierarchyService
      this.HierarchyServiceInstance = serviceScope.consume(MockHierarchyService.serviceKey);
    }
console.log( this.HierarchyServiceInstance)
    this.HierarchyServiceInstance.getHierarchyInfo(listName).then((hierarchyItems: any) => {
      if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {   
  
console.log(hierarchyItems)
if (hierarchyItems.length > 0) {
  let hierarchyNodes: ITreeItem[] = [];
  var count: number;

  for (count = 0; count < hierarchyItems.length; count++) {
    array.push( {
      key: hierarchyItems[count].Id,
      label:hierarchyItems[count].Title,
      data: hierarchyItems[count].URL,
    
      Parent:  hierarchyItems[count].Parent ? hierarchyItems[count].Parent.Id : undefined


      
    });
  }
  array.forEach(function (v, i) {
    const trea: ITreeItem = {
      key: v.key,
      label: v["label"],
      data: v["data"],
      Parent: v["Parent"],
      children: []


      
    }
    alltreearr.push(trea);
    if (v["Parent"] == null||undefined) {
      const tree: ITreeItem = {
        key: v.key,
        label: v["label"],
        data: v["data"],
        Parent: null,
        children: []
      }
      treearr.push(tree);
    }
    
  });
  
 this.add(treearr,alltreearr); 
  console.log(treearr);  
 
  this.setState({
    
    TreeLinks: treearr,
    isLoading: false,
    showErrorMessage: false
  });}
  else{
    this.setState({
      TreeLinks: treearr,
      isLoading: false,
      showErrorMessage: false
    });
  
  }
}
else {
  this.setState({
    
    isLoading: false,
    showErrorMessage: false
  });
 
}
})
     
   
      
  }

  public  add(treearr: ITreeItem[],alltreearr: ITreeItem[]){
    treearr.forEach(item=>{
      item.children =  alltreearr.filter(i=>i["Parent"]== +item.key);
    if(item.children.length>0)  this.add(item.children,alltreearr);
    })
  }

  public render(): React.ReactElement<IReactHierarchyViewProps> {
    const {
      listName,
      
      selectedList
    } = this.props;
    switch(selectedList){
      case "tree structure":
        return (
          <div className={styles.spfxPnpTreeview}>
          <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              {this.state.isLoading && <Spinner label="Loading Hierarchy View..." />}
              {this.state.hierarchyItems && this.state.hierarchyItems.children && 
                <TreeView
                items={this.state.TreeLinks}
                
                defaultExpanded={false}
                selectionMode={TreeViewSelectionMode.None}
                selectChildrenIfParentSelected={false}
                showCheckboxes={false}
                treeItemActionsDisplayMode={TreeItemActionsDisplayMode.Buttons}
                onSelect={this.onTreeItemSelect}
                onExpandCollapse={this.onTreeItemExpandCollapse}
                onRenderItem={this.renderCustomTreeItem} />
                
              }
            </div>
            {this.state.showErrorMessage &&
              <MessageBar messageBarType={MessageBarType.warning} isMultiline={false} dismissButtonAriaLabel="Close">
                {this.state.errorMessage}</MessageBar>
            }
          </div>
        </div>

          </div>

        );
      case "Hierarchy View": 
      return (
       <div className={styles.spfxPnpTreeview}>

        <div className={styles.reactHierarchyView}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              {this.state.isLoading && <Spinner label="Loading Hierarchy View..." />}
              {this.state.hierarchyItems && this.state.hierarchyItems.children &&
                <OrgChart tree={this.state.hierarchyItems} NodeComponent={this.MyNodeComponent} />
                
              }
            </div>
            {this.state.showErrorMessage &&
              <MessageBar messageBarType={MessageBarType.warning} isMultiline={false} dismissButtonAriaLabel="Close">
                {this.state.errorMessage}</MessageBar>
            }
          </div>
        </div>
        </div>
       </div>
      
        
      );
      default:
        return(
          <div className={styles.spfxPnpTreeview}></div>
        )

    }





    
  }
   private onTreeItemSelect(items: ITreeItem[]) {
    console.log("Items selected: ", + items.length);
  }
 
  private onTreeItemExpandCollapse(item: ITreeItem, isExpanded: boolean) {
    console.log((isExpanded ? "Item expanded: " : "Item collapsed: ") + item);
  }
 
  private renderCustomTreeItem(item: ITreeItem): JSX.Element {

    

    if (item.data) {
          
          return (
            <div className={styles.divstyle} >
              <a onClick={()=> window.open(item.data.Url, "_blank")}>{item.label}</a>
             
            </div>
          );
        }
        else {
          return (
            <div className={styles.divstyle}  >{item.label}</div> 
          );
        }
         
    
       
    
       
      }

  private MyNodeComponent = ({ node }) => {
    
    if (node.url) {
      return (
        <div className="initechNode">
          <a  onClick={()=> window.open(node.url.Url, "_blank")} >{node.title}</a>
        </div>
      );
    }
    else {
      return (
        <div className="initechNode">{node.title}</div>
       
        
      );
    }
  }
}
