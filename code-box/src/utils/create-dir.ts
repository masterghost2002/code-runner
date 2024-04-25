import fs from 'fs';
export default async function createDir(folderPath:string){
    try {
        await fs.promises.mkdir(folderPath, {recursive:true});
        return {isSuccess:true, msg:'Folder is created'};
    } catch (error) {
        return {isSuccess:false, msg:'Failed to created folder'}
    }
};