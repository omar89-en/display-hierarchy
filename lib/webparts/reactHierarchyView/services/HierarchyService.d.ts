import { IHierarchyService } from '../interfaces';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IHierarchyItem } from '../interfaces/IHierarchyItem';
export declare class HierarchyService implements IHierarchyService {
    static readonly serviceKey: ServiceKey<IHierarchyService>;
    private _spHttpClient;
    private _pageContext;
    private _currentWebUrl;
    constructor(serviceScope: ServiceScope | any);
    getHierarchyInfo(listName: string): Promise<IHierarchyItem[]>;
}
//# sourceMappingURL=HierarchyService.d.ts.map