import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import useFileStore from "../../store/files/useFileStore";
type props = {
    folderName: string;
    path:string;
    children: React.ReactNode;
}
const FolderContainer = ({ folderName,path, children }: props) => {
    const [isSelected, setIsSelected] = useState(false);
    const setSelectedPath = useFileStore(state=>state.setSelectedPath);
    const handleOnFolderSelect = ()=>{
        setIsSelected(prev=>{
            if(prev === false){
                setSelectedPath(path);
                return true;
            }
            setSelectedPath(undefined);
            return false;
        });
    }
    return (<div className="ml-[10px]">
            <button className="flex gap-2 items-center hover:bg-[#202020] w-full p-1 rounded-md hover:cursor-pointer" onClick={handleOnFolderSelect}>
                <span>
                    {isSelected ? <IoIosArrowDown/> : <IoIosArrowForward/>}
                </span>
                <span>
                    {folderName}
                </span>
            </button>
        {
            isSelected && children
        }
    </div>)
};
export default FolderContainer;