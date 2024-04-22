import { useEffect } from 'react';
import TreeViewer from './tree-viewer';
import useFileStore from '../../store/files/useFileStore';
import useSocket from '../../hooks/useSocket';
import { TreeRoot, FileType } from '../../../types';
const folderPath = '/media/rakeshssd/codespace/code-runner/test-temp'
export default function FileNavBar() {
    const { setFileTree, fileTree } = useFileStore((state) => state);
    const io = useSocket({ url: 'http://localhost:5000' });
    useEffect(() => {
        if (!io) {
            console.log('Socket connection to server failed');
            return;
        }
        io.emit('GET_FILE_TREE', folderPath);
        io.on('RESULT_GET_FILE_TREE', (fileTree: Array<TreeRoot>) => {
            const final_result = [{
                name:"root",
                type:FileType.DIR,
                childrens:fileTree,
                path:folderPath
            }];
            setFileTree(final_result);
        });
    }, [io, setFileTree]);
    return (
        <div className="flex bg-[#191919] flex-col flex-shrink-0 w-[20%] p-2 gap-5">
            <h1 className="text-xl font-bold">Code Runner</h1>
            <div className='flex flex-col gap-2'>
               {fileTree.length >= 1 && <TreeViewer
                    tree={fileTree[0]}
                />}
            </div>
        </div>
    )
}