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
    const setSelectedPath = useFileStore(state=>state.setSelectedPath);
    const selectedPath = useFileStore(state=>state.selectedPath);
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
    const handleContextMenuOpenChange = (isOpen:boolean)=>{
        if(isOpen)
            setSelectedPath(path);
    }
    return (<div className="w-full pl-2">
        <FolderContextMenu
            handleContextMenuOpenChange = {handleContextMenuOpenChange}
            setIsSelectedFolder={setIsSelected}
        >   
            <button 
                className={`flex gap-2 text-[16px] items-center hover:bg-[#202020] ${selectedPath === path && 'border-2 border-green-300'} w-full rounded-sm hover:cursor-pointer`}
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
            isSelected  && children
        }
    </div>)
};
export default FolderContainer;