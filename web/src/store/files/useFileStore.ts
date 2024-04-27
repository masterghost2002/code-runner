import { create } from 'zustand';
import { persist, } from 'zustand/middleware';
import {FileType, TreeRoot} from '../../../types';
export type RecentFile = {
    name:string;
    path:string;
    parentFolder?:string;
}
type FileAdding = {
    isAdding:boolean;
    type:FileType | undefined
}
type FileRenaming = {
    isRenaming:boolean;
    type:FileType | undefined;
}
type FileStore = {
    fileTree:Array<TreeRoot>;
    recentFiles:Array<RecentFile>;
    currentOpenedFile:RecentFile | undefined;
    selectedPath:string | undefined;
    isAddingFileOrFolder:FileAdding;
    isRenamingFileOrFolder:FileRenaming;
    setIsAddingFileOrFolder:(value:FileAdding)=>void;
    setFileTree:(fileTree:Array<TreeRoot>)=>void;
    removeFromRecents:(file:RecentFile)=>void;
    setSelectedPath:(path:string | undefined)=>void;
    setCurrentOpenFile:(file:RecentFile | undefined)=>void;
    setIsRenamingFileOrFolder:(value:FileRenaming)=>void;
}

const useFileStore = create<FileStore>()(persist((set, get) => ({
    fileTree:[],
    recentFiles: [],
    currentOpenedFile:undefined,
    selectedPath:undefined,
    isAddingFileOrFolder:{isAdding:false, type:undefined},
    isRenamingFileOrFolder:{isRenaming:false, type:undefined},
    removeFromRecents:(file:RecentFile)=>{
        const _recentFiles =[...get().recentFiles];
        const _new_recents = _recentFiles.filter((f:RecentFile)=>f.path !== file.path);
        let newOpen = _new_recents.length>0?_new_recents[_new_recents.length-1]:undefined;
        set({currentOpenedFile:newOpen, recentFiles:_new_recents});
    },
    setCurrentOpenFile:(file:RecentFile | undefined)=>{
        if(!file){
            set({currentOpenedFile:undefined});
            return;
        }
        const _recentFiles =[...get().recentFiles];
        const fileIndex = _recentFiles.findIndex((f:RecentFile)=>f.path === file.path);
        if(fileIndex === -1)
            _recentFiles.push(file);
        set({currentOpenedFile:file, recentFiles:_recentFiles});
    },
    setFileTree: (fileTree:Array<TreeRoot>)=>{
       set({fileTree});
    },
    setSelectedPath:(path:string | undefined)=>{
        set({selectedPath:path});
    },
    setIsAddingFileOrFolder:(value:FileAdding)=>set({isAddingFileOrFolder:value}),
    setIsRenamingFileOrFolder:(value:FileRenaming)=>set({isRenamingFileOrFolder:value})
}), {
    name: 'code-runner-code-editor',
    partialize:(state)=>({recentFiles:state.recentFiles, currentOpenedFile:state.currentOpenedFile,fileTree:state.fileTree})
}
));
export default useFileStore;
