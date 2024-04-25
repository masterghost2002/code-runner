import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import React from 'react';
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Folder, File, Trash2, Pen } from "lucide-react";
type props = {
    children: React.ReactNode;
    setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
export default function FolderContextMenu({ children, setIsContextMenuOpen }: props) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent className="bg-[#1f1f1f] rounded-md border-none">
                <CustomContextMenu>
                    New Folder <Folder size={20} />
                </CustomContextMenu>
                <CustomContextMenu>
                    New File <File size={20} />
                </CustomContextMenu>
                <CustomContextMenu>
                    Rename
                    <Pen size={20} />
                </CustomContextMenu>
                <CustomContextMenu>
                    Delete <Trash2 size={20} className="text-red-500" />
                </CustomContextMenu>
            </ContextMenuContent>
        </ContextMenu>

    );
}