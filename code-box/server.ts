import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import buildFileTree from './src/utils/build-file-tree';
import readContent from './src/utils/read-content';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:"*"
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
  socket.on('GET_FILE_TREE', (folderPath:string)=>{
    const fileTree = buildFileTree(folderPath);
    socket.emit('RESULT_GET_FILE_TREE', fileTree);
  });
  socket.on('GET_FILE_CONTENT', async (filePath:string)=>{
    const content = await readContent(filePath);
    socket.emit('RESULT_FILE_CONTENT', {path:filePath, content});
  })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
