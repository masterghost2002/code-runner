import getExtensionIcon from "../../utils/get-extension-icon";
import useFileStore from "../../store/files/useFileStore";
import FileContextMenu from "./file-context-menu";
type props = {
    filename: string;
    filepath: string;
}
export default function FileContainer({ filename, filepath }: props) {
    const Icon = getExtensionIcon(filename);
    const setCurrentOpenFile = useFileStore(state => state.setCurrentOpenFile);
    const handleFileClick = () => {
        const recentFile = {
            name: filename,
            path: filepath
        }
        setCurrentOpenFile(recentFile);
    }
    return (
        <FileContextMenu>
            <button onClick={handleFileClick} className="text-white w-full p-1 text-sm flex gap-2 items-center font-mono hover:bg-[#202020]   rounded-md hover:cursor-pointer">
                <div className="flex-shrink-0 flex-grow-1">
                    <Icon />
                </div>
                {filename}
            </button>
        </FileContextMenu>
    )
}