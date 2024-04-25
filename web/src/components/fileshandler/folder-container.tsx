import { useState } from "react";
import { ChevronDown, ChevronRight  } from 'lucide-react';
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
    const selectedPath = useFileStore(state=>state.selectedPath);
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
                className={`flex gap-2 text-[16px] items-center hover:bg-[#202020] ${selectedPath === path && 'border-2 border-gray-400'} w-full p-1 rounded-md hover:cursor-pointer`}
                onContextMenu={handleContextMenu} 
                onClick={handleOnFolderSelect}
            >
                <span>
                    {isSelected ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
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