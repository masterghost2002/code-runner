import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
type props = {
    folderName: string;
    children: React.ReactNode
}
const FolderContainer = ({ folderName, children }: props) => {
    const [isSelected, setIsSelected] = useState(false);
    return (<div className="ml-[10px]">
        <div className="flex gap-2">
            <button className="flex gap-2 items-center" onClick={() => setIsSelected(prev => !prev)}>
                <span>
                    {isSelected ? <IoIosArrowDown/> : <IoIosArrowForward/>}
                </span>
                <span>
                    {folderName}
                </span>
            </button>
        </div>
        {
            isSelected && children
        }
    </div>)
};
export default FolderContainer;