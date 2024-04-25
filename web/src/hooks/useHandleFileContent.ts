import { useEffect, useState } from "react";
import useSocket from "./useSocket";
import useFileStore from "../store/files/useFileStore";
import getLanguageFromFilename from "../utils/get-language-name";
import debounce from "../utils/debounce";
export default function useHandleFileContent(){
    const io = useSocket({url:'http://localhost:5000'});
    const [content, setContent]  =  useState<string>('');
    const currentOpenedFile = useFileStore(state=>state.currentOpenedFile);
    const setCurrentOpenFile = useFileStore(state=>state.setCurrentOpenFile);
    const recentFiles = useFileStore(state=>state.recentFiles);
    const language = getLanguageFromFilename(currentOpenedFile?.name);
    const onContentChange = debounce((content:string | undefined)=>{
        if(!content || !io || !currentOpenedFile) return;
        io.emit('EDIT_FILE_CONTENT', {
            filePath:currentOpenedFile.path,
            content:content
        });
    }, 600);
    useEffect(()=>{
        if(!io) return;
        if(!currentOpenedFile && recentFiles.length === 0) return;
        if(!currentOpenedFile){
            const lastFile = recentFiles[recentFiles.length-1];
            setCurrentOpenFile(lastFile);
        }else{
            io.emit('GET_FILE_CONTENT', currentOpenedFile?.path);
            io.on('RESULT_FILE_CONTENT', (data:{path:string, content:string})=>setContent(data.content));       
        }

    }, [currentOpenedFile, recentFiles, setCurrentOpenFile, io]);
    return {content, language, onContentChange};
}