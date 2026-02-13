import { useRef, useState } from 'react';

import { ToastContainer, Zoom } from 'react-toastify';

import { buildURL } from '@/lib/path_utils';

import { PackagesContext } from '@/contexts';

import { Separator } from '@/components/ui/separator';
import { Button } from './components/ui/button';
import { OfflineAppBadge } from '@/components/Badges';
import Header from '@/components/Header';
import OpenSourceLink from '@/components/OpenSourceLink';
import PackageDropzone from '@/components/PackageDropzone';
import PackageAnalysisViewSelector from '@/components/PackageAnalysisViewSelector';
import DraggablePackage from '@/components/DraggablePackage';

import { ArrowDown } from 'lucide-react';
import { TooltipProvider } from './components/ui/tooltip';

import staticPaths from '@/data/staticPaths.json';



/** An app to check Unreal Engine packages for suspicious content */
function App() {
	const selectorRef = useRef<HTMLDivElement>(null);

	const [analyzedPkgs, setAnalyzedPkgs] = useState<AnalyzedPackage[]>([]);
	

	const scrollToSelector = () => {
		selectorRef.current?.scrollIntoView({
			behavior: 'smooth'
		});
	};
	

	return (<>
		<TooltipProvider>
			<main className='flex flex-col lg:block dark bg-background text-foreground w-full h-full font-[Arial]'>
				<div className='flex w-full px-4 pt-4 lg:fixed'>
					<OfflineAppBadge />
					<div className='grow'></div>
					<OpenSourceLink />
				</div>

				<div className='flex flex-col lg:flex-row w-full h-full items-center gap-7 lg:gap-0 lg:justify-evenly'>
					<PackagesContext.Provider value={{
						analyzedPkgs, setAnalyzedPkgs
					}}>
						<div className='flex flex-col relative gap-10 px-2 lg:px-0 mt-[15%] lg:mt-0 justify-center items-center'>
							<Header />
							<PackageDropzone />
							<div className='absolute bottom-0 right-[-1em] -rotate-5 bg-background p-1'>
								<DraggablePackage path={buildURL(staticPaths.examplePackages.tester)} />
							</div>
						</div>

						<Separator orientation='vertical' className='h-[80%]! hidden lg:block' />
						<Button
							onClick={scrollToSelector}
							variant='secondary'
							className='rounded-full w-10 h-10 p-1.5 text-muted-foreground cursor-pointer block md:hidden'
							asChild
						>
							<ArrowDown />
						</Button>

						<div ref={selectorRef} className='p-2 lg:p-0 w-screen h-screen lg:w-[40%] lg:h-[85%]'>
							<PackageAnalysisViewSelector />
						</div>
					</PackagesContext.Provider>
				</div>
			</main>

			<ToastContainer
				position="bottom-left"
				theme="dark"
				transition={Zoom}
			/>
		</TooltipProvider>
	</>)
}

export default App;