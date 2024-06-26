import React from "react";
import { ChevronRight, Text } from 'lucide-react';
import useFileStore from "../../store/files/useFileStore";
import useSocket from "../../hooks/useSocket";
import { FileType, TreeRoot } from "../../../types";
const folderPath = '/media/rakeshssd/codespace/code-runner/test-temp';
type props = {
    currentPath: string;
}
export default function InputBoxFileFolder({ currentPath }: props) {
    const io = useSocket({ url: 'http://localhost:5000' });
    const inputRef = React.useRef<null | HTMLInputElement>(null);
    const [inputData, setInputData] = React.useState<string>('');
    const selectedPath = useFileStore(state => state.selectedPath);
    const setFileTree = useFileStore(state => state.setFileTree)
    const isAddingFileOrFolder = useFileStore(state => state.isAddingFileOrFolder);
    const setIsAddingFileOrFolder = useFileStore(state => state.setIsAddingFileOrFolder);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputData(e.target.value);
    const onSave = () => {
        setIsAddingFileOrFolder({ isAdding: false, type: undefined });
        if (!io || inputData.trim().length === 0) return;
        const name = inputData.trim();
        const completePath = currentPath + '/' + name;

        //TODO: find a better way to update the file tree, something like always listen to GET_FILE_TREE_EVENT
        if (isAddingFileOrFolder.type === FileType.FILE) {
            io.emit('REQUEST_CREATE_FILE', { filePath: completePath, rootFolder: folderPath });
            io.on('RESULT_CREATE_FILE', (data: { isSuccess: boolean, msg: string, fileTree: Array<TreeRoot> }) => {
                if (!data.isSuccess) {
                    alert(data.msg);
                    return;
                }
                const final_result = [{
                    name: "root",
                    type: FileType.DIR,
                    childrens: data.fileTree,
                    path: folderPath
                }];
                setFileTree(final_result);
            })
        } else {
            io.emit('REQUEST_CREATE_FOLDER', { folderPath: completePath, rootFolder: folderPath });
            io.on('RESULT_CREATE_FOLDER', (data: { isSuccess: boolean, msg: string, fileTree: Array<TreeRoot> }) => {
                if (!data.isSuccess) {
                    alert(data.msg);
                    return;
                }
                const final_result = [{
                    name: "root",
                    type: FileType.DIR,
                    childrens: data.fileTree,
                    path: folderPath
                }];
                setFileTree(final_result);
            })
        }

    };
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        onSave();
    }
    React.useEffect(() => {
        if (!isAddingFileOrFolder.isAdding || !inputRef.current) return;
        inputRef.current.focus();

    }, [isAddingFileOrFolder]);
    if (!isAddingFileOrFolder.isAdding || selectedPath !== currentPath) return null;
    return (
        <div className="w-full mt-2 pl-2 flex gap-1 items-center">
            {
                isAddingFileOrFolder.type === FileType.DIR &&
                <div className="flex-grow-1 flex-shrink-0">
                    <ChevronRight size={14} />
                </div>
            }
            {
                isAddingFileOrFolder.type === FileType.FILE &&
                <div className="flex-grow-1 flex-shrink-0">
                    <Text size={14} />
                </div>
            }
            <input
                onBlur={onSave}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="px-1 w-full rounded-sm focus:auto"
                type="text"
                title="file-or-folder-name"
                ref={inputRef}
            />
        </div>
    );
}