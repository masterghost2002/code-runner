import CodeEditor from "./components/code-editor";
import FileNavBar from "./components/fileshandler/files-navbar";
import Terminal from "./components/terminal";
import CodeEditorLayout from "./components/code-editor-layout";
function App() {

  return (
    <div className="flex h-screen w-full">
      <CodeEditorLayout
          FileNavbar={FileNavBar}
          Editor={CodeEditor}
          Terminal = {Terminal}
      />
      {/* <FileNavBar />
      <div className="flex flex-col w-full flex-grow-1 bg-black">
        <CodeEditor />
        <Terminal />
      </div> */}
    </div>
  )
}

export default App
