import FolderContainer from "./folder-container";
import FileContainer from "./file-container";
import { FileType, type TreeRoot } from "../../../types";
import InputBoxFileFolder from './input-box-file-folder';
import useFileStore from "../../store/files/useFileStore";
type props = {
    tree: TreeRoot
}
export default function TreeViewer({ tree }: props) {
    const childrens = tree.childrens;
    const isAddingFileOrFolder = useFileStore(state => state.isAddingFileOrFolder);
    if (tree.type === "file")
        return <FileContainer filepath={tree.path} filename={tree.name} />
    return (
        <>
            <FolderContainer
                folderName={tree.name}
                path={tree.path}
            >
                {/* If the user is creating a new folder show  the input at the top */}
                {isAddingFileOrFolder.isAdding && isAddingFileOrFolder.type === FileType.DIR && <InputBoxFileFolder
                    currentPath={tree.path}
                />}
                {
                    childrens.map((treeRoot: TreeRoot, index: number) => <TreeViewer key={tree.name + index} tree={treeRoot} />)
                }
                {/* If the user is creating a new file show  the input at the end */}
                {isAddingFileOrFolder.isAdding && isAddingFileOrFolder.type === FileType.FILE && <InputBoxFileFolder
                    currentPath={tree.path}
                />}
            </FolderContainer>
        </>
    )
}