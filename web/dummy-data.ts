const fileData = [{
    "type": "dir",
    "name": "root",
    "childrens": [
        {
            "type": "dir",
            "name": "Folder1",
            "childrens": [
                {
                    "type": "file",
                    "name": "File1.txt",
                    "childrens": []
                },
                {
                    "type": "file",
                    "name": "File2.txt",
                    "childrens": []
                },
                {
                    "type": "dir",
                    "name": "Subfolder1",
                    "childrens": [
                        {
                            "type": "file",
                            "name": "File3.txt",
                            "childrens": []
                        }
                    ]
                }
            ]
        },
        {
            "type": "dir",
            "name": "Folder2",
            "childrens": [
                {
                    "type": "file",
                    "name": "File4.txt",
                    "childrens": []
                }
            ]
        },
        {
            "type": "file",
            "name": "File5.txt",
            "childrens": []
        }
    ]
}];
export const recentFiles = [
    {
        name:'App.jsx',
        path:'/media/rakeshssd/code/App.jsx',
        parentFolder:'code'
    },
    {
        name:'navbar.jsx',
        path:'/media/rakeshssd/code/header/navbar.jsx',
        parentFolder:'header'
    },
    {
        name:'index.html',
        path:'/media/rakeshssd/code/public/index.html',
        parentFolder:'public'
    }
]
export default fileData;
