import fs from 'fs';
export default async function readContent(filePath:string):Promise<string>{
    try{
        const data:string = await fs.promises.readFile(filePath, 'utf-8');
        return data;
    }catch(err){
        return '';
    }
}