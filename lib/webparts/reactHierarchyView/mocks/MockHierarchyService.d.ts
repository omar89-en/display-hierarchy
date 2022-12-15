import { IHierarchyService } from '../interfaces';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
export declare class MockHierarchyService implements IHierarchyService {
    static readonly serviceKey: ServiceKey<IHierarchyService>;
    constructor(serviceScope: ServiceScope);
    getHierarchyInfo(listName: string): Promise<any>;
}
//# sourceMappingURL=MockHierarchyService.d.ts.map