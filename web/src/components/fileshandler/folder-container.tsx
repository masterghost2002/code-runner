import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import useFileStore from "../../store/files/useFileStore";
import FolderContextMenu from "./folder-context-menu";
type props = {
    folderName: string;
    path:string;
    children: React.ReactNode;
}
const FolderContainer = ({ folderName,path, children }: props) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const setSelectedPath = useFileStore(state=>state.setSelectedPath);
    const handleContextMenu = ()=>{
        setIsContextMenuOpen(true);
    }
    const handleOnFolderSelect = ()=>{
        setIsSelected(prev=>{
            if(prev === false){
                setSelectedPath(path);
                return true;
            }
            setSelectedPath(undefined);
            return false;
        });
    }
    return (<div className="ml-[10px]">
        <FolderContextMenu
            setIsContextMenuOpen = {setIsContextMenuOpen}
        >
            <button 
                className={`flex gap-2 items-center hover:bg-[#202020] w-full p-1 rounded-md hover:cursor-pointer`}
                onContextMenu={handleContextMenu} 
                onClick={handleOnFolderSelect}
            >
                <span>
                    {isSelected ? <IoIosArrowDown/> : <IoIosArrowForward/>}
                </span>
                <span>
                    {folderName}
                </span>
            </button>
        </FolderContextMenu>
        {
            isSelected && children
        }
    </div>)
};
export default FolderContainer;