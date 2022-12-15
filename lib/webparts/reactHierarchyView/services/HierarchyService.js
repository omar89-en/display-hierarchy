import { ServiceKey } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { SPHttpClient } from '@microsoft/sp-http';
import { sp } from "@pnp/sp/presets/all";
var HierarchyService = /** @class */ (function () {
    function HierarchyService(serviceScope) {
        var _this = this;
        serviceScope.whenFinished(function () {
            _this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
            _this._pageContext = serviceScope.consume(PageContext.serviceKey);
            _this._currentWebUrl = _this._pageContext.web.absoluteUrl;
        });
    }
    HierarchyService.prototype.getHierarchyInfo = function (listName) {
        return sp.web.lists.getByTitle(listName)
            .items
            .select('Title,Id,URL,Parent/Id,Parent/Title')
            .expand('Parent')
            .get()
            .then(function (items) {
            return Promise.resolve(items);
        }).catch(function (error) { return Promise.reject(error); });
    };
    HierarchyService.serviceKey = ServiceKey.create('datacenter:hierarchyService', HierarchyService);
    return HierarchyService;
}());
export { HierarchyService };
//# sourceMappingURL=HierarchyService.js.map