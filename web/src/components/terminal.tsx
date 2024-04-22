import { useEffect, useRef } from "react";
import { Terminal as XtermTerminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import useSocket from "../hooks/useSocket";
import arrBufferToString from "../utils/array-buffer-to-string";
const fitAddon = new FitAddon();
const OPTIONS_XTERM = {
    screenKeys: true,
    cursorBlink: true,
    cols: 200,
    rows:100
};
export default function Terminal() {
    const terminalContainerRef = useRef<HTMLDivElement | null>(null);
    const io = useSocket({ url: 'http://localhost:5000' });

    useEffect(() => {
        if (!terminalContainerRef.current || !io) {
            return;
        }

        io.emit("REQUEST_TERMINAL");
        io.on("RESULT_REQUEST_TERMINAL", terminalHandler)
        const term = new XtermTerminal(OPTIONS_XTERM);
        term.loadAddon(fitAddon);
        term.open(terminalContainerRef.current);
        fitAddon.fit();
        function terminalHandler({ data }: { data: any }) {
            if (data instanceof ArrayBuffer) {
                const dataInString = arrBufferToString(data);
                term.write(dataInString)
            }
        }
        term.onData((data) => {
            io.emit('TERMINAL_DATA', data);
        });

        io.emit('TERMINAL_DATA', '\n');
    }, [terminalContainerRef, io]);

    return <div className="flex flex-grow-1 overflow-y-auto max-h-30vh">
        <div ref={terminalContainerRef} className="w-[70vw] max-h-[30vh]" />
    </div>
}