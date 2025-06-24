import logo from '../assets/ahoylove.svg'

export default function Error() {
    return (
        <div className='flex flex-col justify-center gap-8 items-center h-screen w-screen bg-linear-to-b from-slate-950 to-indigo-900 text-white md:p-8 p-4 relative'>
            <img src={logo} alt='Ahoylove logo' className="w-40 absolute top-6 md:static md:mb-6" />
            <h1 className='text-xl'>Oops! There seems to be some error fetching your partner's data. Please try refreshing or saving the settings again.</h1>
        </div>
    )
}