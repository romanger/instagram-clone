import Image from "next/image";
import {
    HeartIcon,
    MenuIcon,
    PaperAirplaneIcon,
    PlusCircleIcon,
    SearchIcon,
    UserGroupIcon
} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {modalState} from "../atoms/modalAtom";


const Header = () => {
    const {data: session} = useSession()
    const [open, setOpen] = useRecoilState(modalState)
    const router = useRouter()

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
                <div onClick={() => router.push('/')} className='relative lg:hidden w-10 flex-shrink-0 cursor-pointer'>
                    <Image
                        src='https://links.papareact.com/jjm'
                        layout='fill'
                        objectFit='contain'
                    />
                </div>
                <div onClick={() => router.push('/')} className='relative hidden lg:inline-grid w-24 cursor-pointer'>
                    <Image
                        src='https://links.papareact.com/ocw'
                        layout='fill'
                        objectFit='contain'
                    />
                </div>
                <div className='max-w-sm'>
                    <div className='mt-1 relative p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-500'/></div>
                        <input
                            className='bg-gray-50 block w-full pl-10 sm:text-sm focus:ring-black border-gray-300 focus:border-black rounded-md'
                            type="text" placeholder='Search'/>
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon onClick={() => router.push('/')} className='navBtn'/>
                    <MenuIcon className='w-10 h-10 md:hidden cursor-pointer'/>

                    {session ? (
                        <>
                            <div className='relative navBtn'>
                                <PaperAirplaneIcon className='navBtn rotate-45'/>
                                <div
                                    className='absolute -top-2 -right-1 w-4/5 h-4/5 text-xs bg-red-500 rounded-full flex items-center justify-center text-white'>3
                                </div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn'/>
                            <UserGroupIcon className='navBtn'/>
                            <HeartIcon className='navBtn'/>

                            <img onClick={signOut} src={session.user.image} alt={session.user.name}
                                 title={session.user.name}
                                 className='h-10 w-10 rounded-full cursor-pointer'/>
                        </>
                    ) : (
                        <button onClick={signIn}>Sign in</button>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Header
