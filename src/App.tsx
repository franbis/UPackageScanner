import { useState } from 'react';

import { ToastContainer, Zoom } from 'react-toastify';

import { PackagesContext } from '@/contexts';

import { Separator } from '@/components/ui/separator';
import { OfflineAppBadge } from '@/components/Badges';
import Header from '@/components/Header';
import OpenSourceLink from '@/components/OpenSourceLink';
import PackageDropzone from '@/components/PackageDropzone';
import PackageAnalysisViewSelector from '@/components/PackageAnalysisViewSelector';



/** An app to check Unreal Engine packages for suspicious content */
function App() {
	const [analyzedPkgs, setAnalyzedPkgs] = useState<AnalyzedPackage[]>([]);
	

	return (<>
		<main className='flex flex-col md:block dark bg-background text-foreground w-full h-full font-[Arial]'>
			<div className='flex w-full px-4 pt-4 md:fixed'>
				<OfflineAppBadge />
				<div className='grow'></div>
				<OpenSourceLink />
			</div>

			<div className='flex flex-col md:flex-row w-full h-full items-center gap-7 md:gap-0 md:justify-evenly'>
				<PackagesContext.Provider value={{
					analyzedPkgs, setAnalyzedPkgs
				}}>
					<div className='flex flex-col gap-10 px-2 md:px-0 my-[20%] md:my-0 justify-center items-center'>
						<Header />
						<PackageDropzone />
					</div>

					<Separator orientation='vertical' className='h-[80%]! hidden md:block' />

					 <div className='p-2 md:p-0 w-screen h-screen md:w-[40%] md:h-[85%]'>
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
	</>)
}

export default App;