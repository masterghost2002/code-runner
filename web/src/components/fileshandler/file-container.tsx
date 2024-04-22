import getExtensionIcon from "../../utils/get-extension-icon";
import useFileStore from "../../store/files/useFileStore";
type props = {
    filename: string;
    filepath: string;
}
export default function FileContainer({ filename, filepath }: props) {
    const Icon = getExtensionIcon(filename);
    const setCurrentOpenFile  = useFileStore(state => state.setCurrentOpenFile);
    const handleFileClick = () => {
        const recentFile = {
            name: filename,
            path: filepath
        }
        setCurrentOpenFile(recentFile);
    }
    return (<button onClick={handleFileClick} className="text-white my-1 ml-1 text-sm flex gap-2 items-center font-mono cursor-pointer">
        <Icon />
        {filename}
    </button>)
}