import fs from 'fs';
export default async function createFile(filePath: string):Promise<{isSucess:boolean, msg:string}> {
    try {
        await fs.promises.writeFile(filePath, '');
        return  {isSucess:true, msg:'File Created'};
    } catch (err) {
        return {isSucess:false, msg:'Failed to create file'};
    }
}