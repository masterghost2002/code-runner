import {useEffect} from 'react';
import useSocket from './useSocket';
import useFileStore from '../store/files/useFileStore';
import { TreeRoot, FileType } from '../../types';
const folderPath = '/media/rakeshssd/codespace/code-runner/test-temp'
export default function useGetFileTree(){
    const setFileTree = useFileStore(state=>state.setFileTree);
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
};