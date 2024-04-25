import fs from 'fs';
export default async function createFile(filePath: string):Promise<{isSuccess:boolean, msg:string}> {
    try {
        await fs.promises.writeFile(filePath, '');
        return  {isSuccess:true, msg:'File Created'};
    } catch (err) {
        return {isSuccess:false, msg:'Failed to create file'};
    }
}