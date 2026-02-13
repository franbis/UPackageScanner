import { useEffect, useRef } from "react";

import { basename } from "@/lib/path_utils";

import { FileIcon } from "lucide-react";



interface DraggablePackageProps {
    /** Package's filepath */
    path: string
}
/** Render a representation of a draggable package file */
function DraggablePackage({ path }: DraggablePackageProps) {
    const fileContentRef = useRef<ArrayBuffer>(new ArrayBuffer(0));
    
    
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const file = new File([fileContentRef.current], basename(path) as string);
        event.dataTransfer.items.add(file);
    };


    useEffect(() => {
        fetch(path)
            .then(resp => resp.arrayBuffer())
            .then(arrBuff => {
                fileContentRef.current = arrBuff;
            });
    }, []);


    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className='flex-col items-center relative size-15 opacity-75 cursor-grab hover:scale-105 transition-all duration-500 hidden md:flex'
        >
            <FileIcon className='size-full' />
            <div className='absolute bottom-[-2em] pt-0.5 text-nowrap text-center bg-background'>
                <h1>Example Package</h1>
                <p>Drag me!</p>
            </div>
        </div>
    );
};



export default DraggablePackage;