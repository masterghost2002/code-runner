import React from 'react';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import useFileStore from "../../store/files/useFileStore";
export default function FilePathBreadCrumb() {
    const currentOpenedFile = useFileStore(state => state.currentOpenedFile);
    const crumbs = currentOpenedFile?.path.split('/') || [];
    return (
        <Breadcrumb className='bg-black'>
            <BreadcrumbList>
                {
                    crumbs.map((name, index) => (
                        <React.Fragment key={index + name}>
                            <BreadcrumbItem>
                                {name}
                            </BreadcrumbItem>
                            {index !== crumbs.length-1 && <BreadcrumbSeparator />}

                        </React.Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
