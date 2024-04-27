import React from "react";
import { ChevronRight, Text } from 'lucide-react';
import useFileStore from "../../store/files/useFileStore";
import useSocket from "../../hooks/useSocket";
import { FileType, TreeRoot } from "../../../types";
const folderPath = '/media/rakeshssd/codespace/code-runner/test-temp';
type props = {
    currentPath: string;
    currentName:string;
}
export default function RenameFileFolderInput({ currentPath, currentName }: props) {
    const io = useSocket({ url: 'http://localhost:5000' });
    const inputRef = React.useRef<null | HTMLInputElement>(null);
    const [inputData, setInputData] = React.useState<string>(currentName);
    const selectedPath = useFileStore(state => state.selectedPath);
    const setFileTree = useFileStore(state => state.setFileTree)
    const isRenamingFileOrFolder = useFileStore(state => state.isRenamingFileOrFolder);
    const setIsRenamingFileOrFolder = useFileStore(state=>state.setIsRenamingFileOrFolder);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputData(e.target.value);
    const onSave = () => {
        setIsRenamingFileOrFolder({ isRenaming: false, type: undefined });
        if (!io || inputData.trim().length === 0) return;
        const name = inputData.trim();

    };
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        onSave();
    }
    React.useEffect(() => {
        if (!isRenamingFileOrFolder.isRenaming || !inputRef.current) return;
        inputRef.current.focus();

    }, [isRenamingFileOrFolder]);
    if (!isRenamingFileOrFolder.isRenaming || selectedPath !== currentPath) return null;
    return (
        <div className="w-full flex gap-1 items-center">
             {
                isRenamingFileOrFolder.type === FileType.DIR &&
                <div className="flex-grow-1 flex-shrink-0">
                    <ChevronRight size={14} />
                </div>
            }
            {
                isRenamingFileOrFolder.type === FileType.FILE &&
                <div className="flex-grow-1 flex-shrink-0">
                    <Text size={14} />
                </div>
            }
            <input
                onBlur={onSave}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={inputData}
                className="px-1 w-full rounded-sm focus:auto"
                type="text"
                title="file-or-folder-name"
                ref={inputRef}
            />
        </div>
    );
}