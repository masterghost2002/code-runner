import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import buildFileTree from './src/utils/build-file-tree';
import readContent from './src/utils/read-content';
import editContent from './src/utils/edit-content';
import createFile from './src/utils/create-file';
import * as pty from 'node-pty';
const app = express();
const server = http.createServer(app);
let term = pty.spawn('bash', [], {
  cols: 200,
  rows: 100,
  name: 'xterm',
  cwd: '/media/rakeshssd/codespace/code-runner/test-temp'
});
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
app.use(cors());
app.get('/', (_, res) => {
  res.send('Hello world');
});

io.on('connection', (socket: Socket) => {
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('GET_FILE_TREE', (folderPath: string) => {
    const fileTree = buildFileTree(folderPath);
    socket.emit('RESULT_GET_FILE_TREE', fileTree);
  });
  socket.on('GET_FILE_CONTENT', async (filePath: string) => {
    const content = await readContent(filePath);
    socket.emit('RESULT_FILE_CONTENT', { path: filePath, content });
  });
  socket.on('REQUEST_TERMINAL', () => {
    term.onData((data: string) => socket.emit('RESULT_REQUEST_TERMINAL', { data: Buffer.from(data, 'utf-8') }));
  });
  socket.on("TERMINAL_DATA", (data:string)=>{
    term.write(data);
  });
  socket.on("EDIT_FILE_CONTENT", (data:{filePath:string, content:string})=>{
    editContent(data.filePath, data.content);
  });
  socket.on('REQUEST_CREATE_FILE', async ({filePath, rootFolder}:{filePath:string, rootFolder:string})=>{
    const result = await createFile(filePath);
    const new_file_tree = buildFileTree(rootFolder);
    socket.emit('RESULT_CREATE_FILE', {...result, fileTree:new_file_tree});
  })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
