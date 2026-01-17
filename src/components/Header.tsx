import AppIcon from '@/assets/img/icons/app/app_icon.svg?react';



/** A header to present the app */
function Header() {
    return (
        <div className='flex gap-3 items-center'>
            <AppIcon className="p-2 w-full h-full lg:w-24 lg:h-24 hidden lg:block" />
            <div className='flex flex-col gap-2 max-w-sm text-center items-center lg:items-start lg:text-left'>
                <h1 className='text-3xl font-bold'>UE Package Checker</h1>
                <h2 className='text-base text-muted-foreground max-w-[30ch]'>Check Unreal Engine packages for suspicious or dangerous content</h2>
            </div>
        </div>
    );
}



export default Header;