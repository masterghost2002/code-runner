import { useEffect, useRef } from "react";
import { Terminal as XtermTerminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import useSocket from "../hooks/useSocket";
import arrBufferToString from "../utils/array-buffer-to-string";
import 'xterm/css/xterm.css';
const fitAddon = new FitAddon();
const XtermTheme = {
    foreground: '#c7c7c7',
    background: '#2b2b2b',
    cursor: '#c7c7c7',
    black: '#2b2b2b',
    brightBlack: '#757575',
    red: '#d75f5f',
    brightRed: '#d75f5f',
    green: '#87af87',
    brightGreen: '#87af87',
    yellow: '#e0cf9f',
    brightYellow: '#e0cf9f',
    blue: '#7aa2f7',
    brightBlue: '#7aa2f7',
    magenta: '#af87d7',
    brightMagenta: '#af87d7',
    cyan: '#87afaf',
    brightCyan: '#87afaf',
    white: '#c7c7c7',
    brightWhite: '#ffffff'
};

const OPTIONS_XTERM = {
    useStyle:true,
    theme:XtermTheme,
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

    return (<div ref={terminalContainerRef} />)
}