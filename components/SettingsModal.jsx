import logo from '../assets/ahoylove_black.svg'
import FileUploadButton from './FileUploadButton'

export default function SettingsModal({onClose}) {
    return (
        <div className="bg-white text-black p-8 absolute z-100 lg:w-2/5 md:w-4/5 rounded-xl flex flex-col items-center justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-9/10 h-auto">
            <img src={logo} alt='Ahoylove logo' className='w-40'/>
            <form className='w-full flex flex-col md:grid md:grid-cols-2 justify-between gap-4 max-w-xl py-4'>
                
                    <label className='col-span-1'>Partner full name<input type='text' name='fullname' required></input></label>
                    <label className='col-span-1'>Nickname (optional)<input type='text' name='nickname'></input></label>
                
                    <label className='col-span-2'>MMSI Number<input type='number' name='mmsi' required ></input></label>
               
                    <label className='col-span-1'>Date of departure (DD/MM/YYYY)<input type='date' name='date-of-departure' required></input></label>
                    <label className='col-span-1'>Time of departure (optional)<input type='time' name='time-of-departure'></input></label>
                
                
                    <label className='col-span-1'>Contract length<input type='number' name='contract-length'></input></label>
                    <FileUploadButton />
                
            </form>
            <button className="text-white bg-black py-2 px-4 mt-4 rounded-lg tracking-wide cursor-pointer" onClick={onClose}>Save details</button>
        </div>
    )
}