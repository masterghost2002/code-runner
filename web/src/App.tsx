import CodeEditor from "./components/code-editor";
import FileNavBar from "./components/fileshandler/files-navbar";
import Terminal from "./components/terminal";
function App() {

  return (
    <div className="flex h-screen w-full">
      <FileNavBar />
      <div className="flex flex-col flex-grow-1 w-full h-[100vh]">
        <CodeEditor />
        <Terminal/>
      </div>
    </div>
  )
}

export default App
