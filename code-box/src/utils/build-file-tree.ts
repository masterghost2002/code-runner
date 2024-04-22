import fs from 'fs';
import path from 'path';
import { TreeRoot, FileType } from '../../types';
export default function buildFileTree(directoryPath: string): Array<TreeRoot> {
    let items: Array<string> = [];
    try {
        items = fs.readdirSync(directoryPath);
    } catch (error) {
        return [];
    }
    const directories: Array<TreeRoot> = [];
    const files: Array<TreeRoot> = [];

    items.forEach(item => {
        const itemPath = path.join(directoryPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            const directoryObject = {
                type: FileType.DIR,
                name: item,
                path: itemPath,
                childrens: buildFileTree(itemPath)
            };
            directories.push(directoryObject);
        } else if (stats.isFile()) {
            const fileObject = {
                type: FileType.FILE,
                name: item,
                path: itemPath,
                childrens: []
            };
            files.push(fileObject);
        }
    });

    return directories.concat(files);
}