import FolderContainer from "./folder-container";
import FileContainer from "./file-container";
import type { TreeRoot } from "../../../types";
type props = {
    tree: TreeRoot
}
export default function TreeViewer({ tree }: props) {
    const childrens = tree.childrens;
    if (tree.type === "file")
        return <FileContainer filepath={tree.path} filename={tree.name}/>
    return (
        <FolderContainer
            folderName={tree.name}
        >
            {
                childrens.map((treeRoot:TreeRoot, index:number)=><TreeViewer key={tree.name+index} tree={treeRoot}/>)
            }
        </FolderContainer>
    )
}