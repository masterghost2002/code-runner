import { FaReact, FaRegFile  } from "react-icons/fa";
import { SiTypescript, SiJavascript  } from "react-icons/si";
import { IconType } from "react-icons";
import { FaCircleInfo } from "react-icons/fa6";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { LuFileJson } from "react-icons/lu";
import { FaGitAlt } from "react-icons/fa";
import { TbFileTypeSvg } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
const ExtensionIconMap:Record<string,IconType> = {
    'jsx': FaReact,
    'tsx':FaReact,
    'ts':SiTypescript,
    'js':SiJavascript,
    'html':FaHtml5,
    'css':IoLogoCss3,
    'json':LuFileJson,
    'md':FaCircleInfo,
    'gitignore':FaGitAlt,
    'java':FaJava,
    'py':FaPython,
    'svg':TbFileTypeSvg
}
export default function getExtensionIcon(fileName:string){
    const splited = fileName.split('.');
    const extension = splited[splited.length-1];
    const Icon = ExtensionIconMap[extension];
    if(!Icon) return FaRegFile;
    return Icon;

}