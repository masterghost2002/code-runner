import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";
import RecentFileHandler from "./fileshandler/recent-file-handler";
import FilePathBreadCrumb from "./fileshandler/filepath-breadcrumb";
type props = {
    FileNavbar: React.ComponentType;
    Editor: React.ComponentType;
    Terminal: React.ComponentType;
}
export default function CodeEditorLayout({ FileNavbar, Editor, Terminal }: props) {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="w-screen"
        >
            <ResizablePanel defaultSize={20}>
                    <FileNavbar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel >
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={70}>
                            <RecentFileHandler/>
                            <FilePathBreadCrumb/>
                            <Editor />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={30}>
                            <Terminal />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
