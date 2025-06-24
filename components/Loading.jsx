import logo from '../assets/ahoylove.svg'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading({text='Loading'}) {
    return (
        <div className='flex flex-col justify-center gap-8 items-center h-screen w-screen bg-linear-to-b from-slate-950 to-indigo-900 text-white md:p-8 p-4 relative'>
            <img src={logo} alt='Ahoylove logo' className="w-40 absolute top-6 mb-6" />
            <h1 className='text-xl'>{text}</h1>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    )
}