var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import styles from './ReactHierarchyView.module.scss';
import { Item } from '../interfaces/IHierarchyItem';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TreeView, TreeViewSelectionMode, TreeItemActionsDisplayMode } from "@pnp/spfx-controls-react/lib/TreeView";
import { HierarchyService } from '../services';
import { MockHierarchyService } from '../mocks';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
var ReactHierarchyView = /** @class */ (function (_super) {
    __extends(ReactHierarchyView, _super);
    function ReactHierarchyView(props) {
        var _this = _super.call(this, props) || this;
        _this.MyNodeComponent = function (_a) {
            var node = _a.node;
            if (node.url) {
                return (React.createElement("div", { className: "initechNode" },
                    React.createElement("a", { onClick: function () { return window.open(node.url.Url, "_blank"); } }, node.title)));
            }
            else {
                return (React.createElement("div", { className: "initechNode" }, node.title));
            }
        };
        _this.state = {
            TreeLinks: [],
            hierarchyItems: null,
            isLoading: true,
            showErrorMessage: false,
            errorMessage: ""
        };
        return _this;
    }
    ReactHierarchyView.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loadHierarchyView(this.props.listName);
                this.loadHierarchytree(this.props.listName);
                return [2 /*return*/];
            });
        });
    };
    ReactHierarchyView.prototype.componentWillReceiveProps = function (nextProps) {
        this.loadHierarchyView(nextProps.listName);
        this.loadHierarchytree(nextProps.listName);
    };
    ReactHierarchyView.prototype.loadHierarchyView = function (listName) {
        var _this = this;
        var serviceScope = this.props.serviceScope;
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
        this.HierarchyServiceInstance.getHierarchyInfo(listName).then(function (hierarchyItems) {
            if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
                if (hierarchyItems.length > 0) {
                    var hierarchyNodes = [];
                    var count;
                    for (count = 0; count < hierarchyItems.length; count++) {
                        hierarchyNodes.push(new Item(hierarchyItems[count].Id, hierarchyItems[count].Title, hierarchyItems[count].URL, hierarchyItems[count].Parent ? hierarchyItems[count].Parent.Id : undefined));
                    }
                    var arrayToTree = require('array-to-tree');
                    var orgChartHierarchyNodes = arrayToTree(hierarchyNodes);
                    var output = JSON.stringify(orgChartHierarchyNodes[0]);
                    _this.setState({
                        hierarchyItems: JSON.parse(output),
                        isLoading: false,
                        showErrorMessage: false
                    });
                }
                else {
                    _this.setState({
                        hierarchyItems: [],
                        isLoading: false,
                        showErrorMessage: true,
                        errorMessage: "No records to be displayed"
                    });
                }
            }
            else {
                _this.setState({
                    hierarchyItems: JSON.parse(hierarchyItems),
                    isLoading: false,
                    showErrorMessage: false
                });
            }
        })
            .catch(function (error) {
            return _this.setState({
                hierarchyItems: [],
                errorMessage: "Please verify web part configuration. Error details: " + error.message,
                isLoading: false,
                showErrorMessage: true
            });
        });
    };
    ReactHierarchyView.prototype.loadHierarchytree = function (listName) {
        var _this = this;
        var serviceScope = this.props.serviceScope;
        var alltreearr = [];
        var treearr = [];
        var array = [];
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
        console.log(this.HierarchyServiceInstance);
        this.HierarchyServiceInstance.getHierarchyInfo(listName).then(function (hierarchyItems) {
            if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
                console.log(hierarchyItems);
                if (hierarchyItems.length > 0) {
                    var hierarchyNodes = [];
                    var count;
                    for (count = 0; count < hierarchyItems.length; count++) {
                        array.push({
                            key: hierarchyItems[count].Id,
                            label: hierarchyItems[count].Title,
                            data: hierarchyItems[count].URL,
                            Parent: hierarchyItems[count].Parent ? hierarchyItems[count].Parent.Id : undefined
                        });
                    }
                    array.forEach(function (v, i) {
                        var trea = {
                            key: v.key,
                            label: v["label"],
                            data: v["data"],
                            Parent: v["Parent"],
                            children: []
                        };
                        alltreearr.push(trea);
                        if (v["Parent"] == null || undefined) {
                            var tree = {
                                key: v.key,
                                label: v["label"],
                                data: v["data"],
                                Parent: null,
                                children: []
                            };
                            treearr.push(tree);
                        }
                    });
                    _this.add(treearr, alltreearr);
                    console.log(treearr);
                    _this.setState({
                        TreeLinks: treearr,
                        isLoading: false,
                        showErrorMessage: false
                    });
                }
                else {
                    _this.setState({
                        TreeLinks: treearr,
                        isLoading: false,
                        showErrorMessage: false
                    });
                }
            }
            else {
                _this.setState({
                    isLoading: false,
                    showErrorMessage: false
                });
            }
        });
    };
    ReactHierarchyView.prototype.add = function (treearr, alltreearr) {
        var _this = this;
        treearr.forEach(function (item) {
            item.children = alltreearr.filter(function (i) { return i["Parent"] == +item.key; });
            if (item.children.length > 0)
                _this.add(item.children, alltreearr);
        });
    };
    ReactHierarchyView.prototype.render = function () {
        var _a = this.props, listName = _a.listName, selectedList = _a.selectedList;
        switch (selectedList) {
            case "tree structure":
                return (React.createElement("div", { className: styles.spfxPnpTreeview },
                    React.createElement("div", { className: styles.container },
                        React.createElement("div", { className: styles.row },
                            React.createElement("div", { className: styles.column },
                                this.state.isLoading && React.createElement(Spinner, { label: "Loading Hierarchy View..." }),
                                this.state.hierarchyItems && this.state.hierarchyItems.children &&
                                    React.createElement(TreeView, { items: this.state.TreeLinks, defaultExpanded: false, selectionMode: TreeViewSelectionMode.None, selectChildrenIfParentSelected: false, showCheckboxes: false, treeItemActionsDisplayMode: TreeItemActionsDisplayMode.Buttons, onSelect: this.onTreeItemSelect, onExpandCollapse: this.onTreeItemExpandCollapse, onRenderItem: this.renderCustomTreeItem })),
                            this.state.showErrorMessage &&
                                React.createElement(MessageBar, { messageBarType: MessageBarType.warning, isMultiline: false, dismissButtonAriaLabel: "Close" }, this.state.errorMessage)))));
            case "Hierarchy View":
                return (React.createElement("div", { className: styles.spfxPnpTreeview },
                    React.createElement("div", { className: styles.reactHierarchyView },
                        React.createElement("div", { className: styles.container },
                            React.createElement("div", { className: styles.row },
                                React.createElement("div", { className: styles.column },
                                    this.state.isLoading && React.createElement(Spinner, { label: "Loading Hierarchy View..." }),
                                    this.state.hierarchyItems && this.state.hierarchyItems.children &&
                                        React.createElement(OrgChart, { tree: this.state.hierarchyItems, NodeComponent: this.MyNodeComponent })),
                                this.state.showErrorMessage &&
                                    React.createElement(MessageBar, { messageBarType: MessageBarType.warning, isMultiline: false, dismissButtonAriaLabel: "Close" }, this.state.errorMessage))))));
            default:
                return (React.createElement("div", { className: styles.spfxPnpTreeview }));
        }
    };
    ReactHierarchyView.prototype.onTreeItemSelect = function (items) {
        console.log("Items selected: ", +items.length);
    };
    ReactHierarchyView.prototype.onTreeItemExpandCollapse = function (item, isExpanded) {
        console.log((isExpanded ? "Item expanded: " : "Item collapsed: ") + item);
    };
    ReactHierarchyView.prototype.renderCustomTreeItem = function (item) {
        if (item.data) {
            return (React.createElement("div", { className: styles.divstyle },
                React.createElement("a", { onClick: function () { return window.open(item.data.Url, "_blank"); } }, item.label)));
        }
        else {
            return (React.createElement("div", { className: styles.divstyle }, item.label));
        }
    };
    return ReactHierarchyView;
}(React.Component));
export default ReactHierarchyView;
//# sourceMappingURL=ReactHierarchyView.js.map