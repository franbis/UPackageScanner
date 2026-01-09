import { useAnalyzedPackages } from "@/hooks/useAnalyzedPackages";
import { parsePkg } from "@/lib/package_utils";
import { ScanLine } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";



/** A file picker where packages, picked or dropped into a
 * drop zone, get checked for suspicious content */
function PackageDropzone() {
    const { analyzePkg } = useAnalyzedPackages();
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            acceptedFiles.forEach(async (file) => {
                try {
                    const pkg = await parsePkg(file);
                    analyzePkg(pkg);
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
            className="border-3 border-dashed border-muted-foreground rounded-lg px-30 py-20 text-center cursor-pointer flex flex-col items-center gap-2 hover:bg-muted hover:border-accent-foreground hover:scale-105 transition-all duration-500"
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