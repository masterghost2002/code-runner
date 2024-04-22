import { IoClose } from "react-icons/io5";
import useFileStore, {RecentFile} from "../../store/files/useFileStore";
type FileToolTipType = {
    fileName:string;
    index:number;
    isSelected:boolean;
    onClick:(index:number)=>void;
    onCancel:(index:number)=>void;
}
const FileToolTip  = ({fileName, onClick, onCancel, index, isSelected}:FileToolTipType)=>{
    return (
        <div className={`flex h-full cursor-pointer gap-2 items-center p-2 border-r-2 border-[#191919] ${isSelected?"bg-[#1f1f1f]":"bg-[#292929]"}` } onClick={()=>onClick(index)}>
            <div>
                {fileName}
            </div>
            <button className="hover:block" onClick={()=>onCancel(index)}>
                <IoClose/>
            </button>
        </div>
    )
}
export default function RecentFileHandler(){
    const {recentFiles,removeFromRecents, setCurrentOpenFile, currentOpenedFile} = useFileStore((state)=>state);
    const onClick = (index:number)=>{
        const file = recentFiles[index];
        setCurrentOpenFile(file);

    };
    const onCancel = (index:number)=>{
        const file = recentFiles[index];
        removeFromRecents(file);
    }
    return (<div className="h-[50px] bg-[#191919] flex overflow-x-auto">
        {
            recentFiles.map((file:RecentFile, index:number)=><FileToolTip 
                key={file.name+index} index={index} 
                fileName={file.name} 
                isSelected={currentOpenedFile?.path === file.path}
                onCancel={onCancel} 
                onClick={onClick}
            />)
        }
    </div>)
}