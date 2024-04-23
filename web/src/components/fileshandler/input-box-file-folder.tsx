import React from "react";
import useFileStore from "../../store/files/useFileStore";
import useSocket from "../../hooks/useSocket";
import { FileType } from "../../../types";
const folderPath = '/media/rakeshssd/codespace/code-runner/test-temp';
type props = {
    currentPath:string;
}
export default function InputBoxFileFolder({currentPath}:props){
    const io   = useSocket({url:'http://localhost:5000'});
    const [inputData, setInputData] = React.useState<string>('');
    const selectedPath = useFileStore(state=>state.selectedPath);
    const isAddingFileOrFolder = useFileStore(state=>state.isAddingFileOrFolder);
    const setIsAddingFileOrFolder = useFileStore(state=>state.setIsAddingFileOrFolder);
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>setInputData(e.target.value);
    const onBlur = ()=>{
        setIsAddingFileOrFolder({isAdding:false, type:undefined});
        if(!io || inputData.trim().length === 0) return;
        const name = inputData.trim();
        if(isAddingFileOrFolder.type === FileType.FILE){
            io.emit('REQUEST_CREATE_FILE', {filePath:currentPath+name, rootFolder:folderPath});
            io.on('RESULT_CREATE_FILE', (data:{isSuccess:boolean, msg:string})=>{
                console.log(data);
                if(!data.isSuccess){
                    alert(data.msg);
                    return;
                }
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