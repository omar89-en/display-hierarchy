import { ServiceKey } from '@microsoft/sp-core-library';
var MockHierarchyService = /** @class */ (function () {
    function MockHierarchyService(serviceScope) {
    }
    MockHierarchyService.prototype.getHierarchyInfo = function (listName) {
        var initechOrg = {
            id: 1,
            title: "Microsoft",
            url: { Description: "Microsoft", Url: "http://www.microsoft.com" },
            children: [
                {
                    id: 2,
                    title: "CMS",
                    url: null,
                    parent_id: 1,
                    children: [
                        { id: 3, title: "SharePoint", parent_id: 2, url: null },
                        { id: 5, title: "DotNetNuke", parent_id: 2, url: null },
                        { id: 6, title: "Sitefinity", parent_id: 2, url: null }
                    ]
                },
                {
                    id: 7,
                    title: "E-Commerce",
                    url: null,
                    parent_id: 1,
                    children: [
                        { id: 8, title: "nopCommerce", parent_id: 7, url: null },
                        { id: 9, title: "asp.net storetront", parent_id: 7, url: null }
                    ]
                },
                {
                    id: 10,
                    title: "3rd Party",
                    url: null,
                    parent_id: 1,
                    children: [
                        { id: 11, title: "Telerik", parent_id: 10, url: null },
                        { id: 12, title: "DevExpress", parent_id: 10, url: null }
                    ]
                }
            ]
        };
        return new Promise(function (resolve, reject) {
            resolve(JSON.stringify(initechOrg));
        });
    };
    MockHierarchyService.serviceKey = ServiceKey.create('datacenter:MockHierarchyService', MockHierarchyService);
    return MockHierarchyService;
}());
export { MockHierarchyService };
//# sourceMappingURL=MockHierarchyService.js.map