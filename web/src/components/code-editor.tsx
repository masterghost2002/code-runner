import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import RecentFileHandler from "./fileshandler/recent-file-handler";
import useSocket from "../hooks/useSocket";
import useFileStore from "../store/files/useFileStore";
import getLanguageFromFilename from "../utils/get-language-name";
import debounce from "../utils/debounce";
export default function CodeEditor () {
    const [content, setContent] = useState<string>("");
    const currentOpenedFile = useFileStore(state=>state.currentOpenedFile);
    const io = useSocket({url:'http://localhost:5000'});
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
        io.emit('GET_FILE_CONTENT', currentOpenedFile?.path);
        io.on('RESULT_FILE_CONTENT', (data:{path:string, content:string})=>setContent(data.content));        
    }, [currentOpenedFile]);
    return (
        <div className="flex h-full flex-col w-full">
            <RecentFileHandler/>
            <Editor
                height={'70dvh'}
                theme="vs-dark"
                value={content}
                path="/media/rakeshssd/codespace/code-runner/web/App.tsx"
                language={language}
                onChange={onContentChange}
            />
        </div>
    )
}