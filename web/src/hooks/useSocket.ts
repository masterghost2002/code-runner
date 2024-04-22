import { useEffect, useState } from 'react';
import {io, Socket} from 'socket.io-client';
type params = {
    url:string;
}
export default function useSocket({url}:params):Socket | null{
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(()=>{

        const new_socket = io(url);
        setSocket(new_socket);
        return ()=>{
            if(socket)
                socket.disconnect();
        }
    }, [url]);
    return socket;
}