import { useState } from 'react';

import { ToastContainer, Zoom } from 'react-toastify';

import { PackageAnalysesContext } from '@/contexts';

import { Separator } from '@/components/ui/separator';
import { OfflineAppBadge } from '@/components/Badges';
import Header from '@/components/Header';
import OpenSourceLink from '@/components/OpenSourceLink';
import PackageDropzone from '@/components/PackageDropzone';
import PackageAnalysesContainer from '@/components/PackageAnalysesContainer';



/** An app to check Unreal Engine packages for suspicious content */
function App() {
	const [analyses, setAnalyses] = useState<PackageAnalysis[]>([]);
	

	return (<>
		<main className='dark bg-background text-foreground w-screen h-screen font-[Arial]'>
			<OfflineAppBadge className='fixed top-4 left-4' />
			<OpenSourceLink />

			<div className='flex flex-row w-full h-full justify-evenly items-center'>
				<PackageAnalysesContext.Provider value={{
					analyses, setAnalyses
				}}>
					<div className='w-[40%] flex flex-col gap-10 justify-center items-center'>
						<Header />
						<PackageDropzone />
					</div>

					<Separator orientation='vertical' className='h-[80%]!' />

					<div className='w-[40%] h-[80%]'>
						<PackageAnalysesContainer />
					</div>
				</PackageAnalysesContext.Provider>
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