export interface IHierarchyItem {
    Title: string;
    Id: number;
    parent_id: number;
    Url?: string;
    Parent: any;
}
export declare class Item {
    private id;
    private title;
    private url;
    private parent_id?;
    constructor(id: number, title: string, url: string, parent_id?: number);
}
//# sourceMappingURL=IHierarchyItem.d.ts.map