import { create } from 'zustand';
import { persist, } from 'zustand/middleware';
import type {TreeRoot} from '../../../types';
export type RecentFile = {
    name:string;
    path:string;
    parentFolder?:string;
}
type FileStore = {
    fileTree:Array<TreeRoot>;
    recentFiles:Array<RecentFile>;
    currentOpenedFile:RecentFile | undefined;
    setFileTree:(fileTree:Array<TreeRoot>)=>void;
    setCurrentOpenFile:(file:RecentFile | undefined)=>void;
    removeFromRecents:(file:RecentFile)=>void;
}

const useFileStore = create<FileStore>()(persist((set, get) => ({
    fileTree:[],
    recentFiles: [],
    currentOpenedFile:undefined,
    removeFromRecents:(file:RecentFile)=>{
        const _recentFiles =[...get().recentFiles];
        const currentOpen = get().currentOpenedFile;
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
    }
}), {
    name: 'code-runner-code-editor'
}
));
export default useFileStore;
