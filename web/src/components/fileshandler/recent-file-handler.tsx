import { IoClose } from "react-icons/io5";
import useFileStore, {RecentFile} from "../../store/files/useFileStore";
import getExtensionIcon from "../../utils/get-extension-icon";
type FileToolTipType = {
    fileName:string;
    index:number;
    isSelected:boolean;
    onClick:(index:number)=>void;
    onCancel:(e: React.MouseEvent<HTMLButtonElement>,index:number)=>void;
}
const FileToolTip  = ({fileName, onClick, onCancel, index, isSelected}:FileToolTipType)=>{
    const Icon = getExtensionIcon(fileName);
    return (
        <div className={`flex h-full cursor-pointer gap-2 items-center p-2 border-r-2 border-[#191919] ${isSelected?"bg-[#1f1f1f]":"bg-[#292929]"}` } onClick={()=>onClick(index)}>
            <div className="flex text-green-300 text-[12px] items-center gap-2">
                <Icon size={14}/>
                {fileName}
            </div>
            <button className="hover:bg-[#191919] p-[2px] rounded-md" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>onCancel(e,index)}>
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
    const onCancel = (e: React.MouseEvent<HTMLButtonElement>, index:number)=>{
        e.stopPropagation();
        const file = recentFiles[index];
        removeFromRecents(file);
    }
    return (<div className="h-[36px] bg-[#191919] flex overflow-x-auto minimal-navbar">
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