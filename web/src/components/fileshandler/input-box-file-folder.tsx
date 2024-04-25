import React from "react";
import useFileStore from "../../store/files/useFileStore";
import useSocket from "../../hooks/useSocket";
import { FileType, TreeRoot } from "../../../types";
const folderPath = '/media/rakeshssd/codespace/code-runner/test-temp';
type props = {
    currentPath:string;
}
export default function InputBoxFileFolder({currentPath}:props){
    const io   = useSocket({url:'http://localhost:5000'});
    const [inputData, setInputData] = React.useState<string>('');
    const selectedPath = useFileStore(state=>state.selectedPath);
    const setFileTree  = useFileStore(state=>state.setFileTree)
    const isAddingFileOrFolder = useFileStore(state=>state.isAddingFileOrFolder);
    const setIsAddingFileOrFolder = useFileStore(state=>state.setIsAddingFileOrFolder);
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>setInputData(e.target.value);
    const onBlur = ()=>{
        setIsAddingFileOrFolder({isAdding:false, type:undefined});
        if(!io || inputData.trim().length === 0) return;
        const name = inputData.trim();
        const completePath = currentPath+'/'+name;
        
        //TODO: find a better way to update the file tree, something like alaways listen to GET_FILE_TREE_EVENT
        if(isAddingFileOrFolder.type === FileType.FILE){
            io.emit('REQUEST_CREATE_FILE', {filePath:completePath, rootFolder:folderPath});
            io.on('RESULT_CREATE_FILE', (data:{isSuccess:boolean, msg:string, fileTree:Array<TreeRoot>})=>{
                console.log(data);
                if(!data.isSuccess){
                    alert(data.msg);
                    return;
                }
                const final_result = [{
                    name:"root",
                    type:FileType.DIR,
                    childrens:data.fileTree,
                    path:folderPath
                }];
                setFileTree(final_result);
            })
        }

    };
    if(!isAddingFileOrFolder.isAdding || selectedPath !== currentPath) return null;
    return (
        <input 
            onBlur={onBlur} 
            onChange={onChange} 
            className="ml-2 p-1 rounded-md focus:auto"
            type="text"
            title="file-or-folder-name"
        />
    );
}