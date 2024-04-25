import Editor from "@monaco-editor/react";
import RecentFileHandler from "./fileshandler/recent-file-handler";
import useHandleFileContent from "../hooks/useHandleFileContent";
export default function CodeEditor () {
    const {content, language, onContentChange} = useHandleFileContent();    
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