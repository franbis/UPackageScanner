import { useDropzone } from "react-dropzone";

import { toast } from "react-toastify";

// @ts-expect-error Third party JS library
import UTReader from '@/lib/third_party/UTPackage.js/UTReader';

import { parsePkg } from "@/lib/package_utils";

import { useAnalyzedPackages } from "@/hooks/useAnalyzedPackages";

import { ScanLine } from "lucide-react";



/** A file picker where packages, picked or dropped into a
 * drop zone, get checked for suspicious content */
function PackageDropzone() {
    const { analyzePkg } = useAnalyzedPackages();
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            acceptedFiles.forEach(async (file) => {
                try {
                    const pkg: UTReader.reader = await parsePkg(file);
                    analyzePkg({ filename: file.name, pkg });
                }
                catch {
                    toast.error('The file is not a standard Unreal Engine 1 package');
                }
            });
        }
    });


    return (
        <div
            {...getRootProps()}
            className="border-3 border-dashed border-muted-foreground rounded-lg px-10 py-10 lg:px-30 lg:py-20 text-center cursor-pointer flex flex-col items-center gap-2 hover:bg-muted hover:border-accent-foreground hover:scale-105 transition-all duration-500"
        >
            <input {...getInputProps()} />
            <ScanLine className='w-10 h-10 text-muted-foreground' />
            <p className='text-muted-foreground text-base'>
                Drop or click to scan packages
            </p>
        </div>
    )
}


export default PackageDropzone;