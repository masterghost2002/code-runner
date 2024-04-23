import TreeViewer from './tree-viewer';
import useFileStore from '../../store/files/useFileStore';
import useGetFileTree from '../../hooks/useGetFileTree';
import CreateFileFolder from './create-file-folder';
export default function FileNavBar() {
    const fileTree = useFileStore((state) => state.fileTree);
    useGetFileTree();
    return (
        <div className="flex bg-[#191919] flex-col flex-shrink-0 w-[20%] p-2 gap-5">
            <h1 className="text-xl font-bold">Code Runner</h1>
            <CreateFileFolder/>
            <div className='flex flex-col gap-2'>
               {fileTree.length >= 1 && <TreeViewer
                    tree={fileTree[0]}
                />}
            </div>
        </div>
    )
}