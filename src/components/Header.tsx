import AppIcon from '@/assets/img/icons/app/app_icon.svg?react';



/** A header to present the app */
function Header() {
    return (
        <div className='flex gap-3 items-center'>
            <AppIcon className="p-2 w-24 h-24" />
            <div className='flex flex-col gap-2 max-w-sm'>
                <h1 className='text-3xl font-bold'>UE Package Checker</h1>
                <h2 className='text-base text-muted-foreground w-80'>Check Unreal Engine packages for suspicious or dangerous content</h2>
            </div>
        </div>
    );
}



export default Header;