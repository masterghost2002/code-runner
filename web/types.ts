export enum FileType{
    FILE = "file",
    DIR = "dir"
};
export type TreeRoot = {
    name:string;
    type:FileType;
    path:string;
    childrens:Array<TreeRoot>;
}