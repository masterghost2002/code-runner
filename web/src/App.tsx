import CodeEditor from "./components/code-editor";
import FileNavBar from "./components/fileshandler/files-navbar";
function App() {

  return (
   <div className="flex">
    <FileNavBar/>
    <CodeEditor/>
   </div>
  )
}

export default App
