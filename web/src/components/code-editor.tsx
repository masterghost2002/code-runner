import Editor from "@monaco-editor/react";
import RecentFileHandler from "./fileshandler/recent-file-handler";
export default function CodeEditor () {
    return (
        <div className="flex flex-col flex-grow-1 w-full">
            <RecentFileHandler/>
            <Editor
                height="100vh"
                theme="vs-dark"
                path="/media/rakeshssd/codespace/code-runner/web/App.tsx"
                language="typescript"
            />
        </div>
    )
}