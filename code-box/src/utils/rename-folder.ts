import fs from 'fs';
export default async function renameDir(oldPath:string, newName:string):Promise<{isSuccess:boolean, msg:string}>{
    try {
        await fs.promises.rename(oldPath, newName);
        return {isSuccess:true, msg:'Dir rename'};
    } catch (error) {
        return {isSuccess:false, msg:'Dir rename failed'}
    }
}