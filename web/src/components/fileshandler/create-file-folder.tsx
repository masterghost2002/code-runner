import { AiFillFileAdd } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FileType } from "../../../types";
import useFileStore from "../../store/files/useFileStore";
export default function CreateFileFolder(){
    const setIsAddingFileOrFolder = useFileStore(state=>state.setIsAddingFileOrFolder);
    const handleCreateClick = (type:FileType)=>{
        setIsAddingFileOrFolder({isAdding:true, type});
    }
    return (
        <div className="flex gap-2 flex-grow-1 justify-end items-center mr-3">
            <button title="add-file" onClick={()=>handleCreateClick(FileType.FILE)}>
                <AiFillFileAdd/>
            </button>
            <button title="add-folder" onClick={()=>handleCreateClick(FileType.DIR)}>
                <MdOutlineCreateNewFolder/>
            </button>
        </div>
    )
}