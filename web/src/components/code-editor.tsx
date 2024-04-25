import Editor from "@monaco-editor/react";
import useHandleFileContent from "../hooks/useHandleFileContent";
export default function CodeEditor () {
    const {content, language, onContentChange} = useHandleFileContent();    
    return (
            <Editor
                theme="vs-dark"
                value={content}
                path="/media/rakeshssd/codespace/code-runner/web/App.tsx"
                language={language}
                onChange={onContentChange}
            />
    )
}