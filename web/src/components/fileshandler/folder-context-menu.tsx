import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import React from 'react';
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Folder, File, Trash2, Pen } from "lucide-react";
import useFileStore from "../../store/files/useFileStore";
import { FileType } from "../../../types";
type props = {
    children: React.ReactNode;
    handleContextMenuOpenChange: (isOpen:boolean)=>void;
    setIsSelectedFolder:React.Dispatch<React.SetStateAction<boolean>>
}
const CustomContextMenu = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
        inset?: boolean
    }
>(({ className, inset, ...props }, ref) => {
    return (
        <ContextMenuItem className="hover:bg-[#141414] focus:bg-[#141414] w-full p-2 rounded-md hover:cursor-pointer display-flex items-center justify-between" {...props} />
    )
})
export default function FolderContextMenu({ children, handleContextMenuOpenChange, setIsSelectedFolder }: props) {
    const setIsAddingFileOrFolder = useFileStore(state=>state.setIsAddingFileOrFolder);
    const setIsRenamingFileOrFolder = useFileStore(state=>state.setIsRenamingFileOrFolder);
    const handleCreateClick = (type:FileType)=>{
        setIsAddingFileOrFolder({isAdding:true, type});
        setIsSelectedFolder(true);
    }
    return (
        <ContextMenu onOpenChange={handleContextMenuOpenChange}>
            <ContextMenuTrigger >{children}</ContextMenuTrigger>
            <ContextMenuContent className="bg-[#1f1f1f] rounded-md border-none font-medium">
                <CustomContextMenu  onClick={()=>handleCreateClick(FileType.DIR)}>
                    New Folder <Folder size={16} />
                </CustomContextMenu>
                <CustomContextMenu  onClick={()=>handleCreateClick(FileType.FILE)}>
                    New File <File size={16} />
                </CustomContextMenu>
                <CustomContextMenu onClick={()=>setIsRenamingFileOrFolder({isRenaming:true, type:FileType.DIR})}>
                    Rename
                    <Pen size={16} />
                </CustomContextMenu>
                <CustomContextMenu>
                    Delete <Trash2 size={16} className="text-red-500" />
                </CustomContextMenu>
            </ContextMenuContent>
        </ContextMenu>

    );
}