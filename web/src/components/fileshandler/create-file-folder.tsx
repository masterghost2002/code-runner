import { AiFillFileAdd } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FileType } from "../../../types";
import useFileStore from "../../store/files/useFileStore";
export default function CreateFileFolder(){
    const setIsAddingFileOrFolder = useFileStore(state=>state.setIsAddingFileOrFolder);
    const selectedPath = useFileStore(state=>state.selectedPath);
    const handleCreateClick = (type:FileType)=>{
        setIsAddingFileOrFolder({isAdding:true, type});
    }
    return (
        <div className="flex gap-2   min-h-8 flex-grow-1 justify-end items-center mr-3">
            {selectedPath && <button title="add-file" onClick={()=>handleCreateClick(FileType.FILE)}>
                <AiFillFileAdd size={20}/>
            </button>}
            {selectedPath && <button title="add-folder" onClick={()=>handleCreateClick(FileType.DIR)}>
                <MdOutlineCreateNewFolder size={20}/>
            </button>}
        </div>
    )
}