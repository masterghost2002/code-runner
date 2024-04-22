import fs from 'fs';
export default function editContent(filePath:string, content:string):Promise<void>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(filePath, content, 'utf-8', (err)=>{
            if(err) reject(err);
            resolve();
        })
    });
};