import logo from '../assets/ahoylove_black.svg'

export default function SettingsModal({onClose}) {
    return (
        <div className="bg-white text-black p-8 absolute z-100 w-1/3 h-3/4 rounded-xl flex flex-col items-center justify-between">
            <img src={logo} alt='Ahoylove logo' className='w-40'/>
            <form className='w-full flex flex-col gap-4'>
                <div className='flex justify-between gap-8'>
                    <label>Partner full name<input type='text' name='fullname' required></input></label>
                    <label>Nickname (optional)<input type='text' name='nickname'></input></label>
                </div>
                <label>MMSI Number<input type='number' name='mmsi' required></input></label>
                <div className='flex justify-between gap-8'>
                    <label>Date of departure (DD/MM/YYYY)<input type='date' name='date-of-departure' required></input></label>
                    <label>Time of departure (optional)<input type='time' name='time-of-departure'></input></label>
                </div>
                <div className='flex justify-between gap-8'>
                    <label>Contract length<input type='number' name='contract-length'></input></label>
                    <label>Background Image (optional)<input type='file' name='bg-img'></input></label>
                </div>
            </form>
            <button className="text-white bg-black py-2 px-4 rounded-lg tracking-wide cursor-pointer" onClick={onClose}>Save details</button>
        </div>
    )
}