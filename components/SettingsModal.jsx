import { useState } from 'react'
import logo from '../assets/ahoylove_black.svg'
import FileUploadButton from './FileUploadButton'

export default function SettingsModal({onClose, onSave, data=null}) {
    const [formData, setFormData] = useState(
        {
            fullName: data?.fullName || '',
            nickname: data?.nickname || '',
            imo: data?.imo || '',
            departureDate: data?.departureDate || null,
            departureTime: data?.departureTime || null,
            contractLength: data?.contractLength || null,
            backgroundImg: data?.backgroundImg || null
        }
    )

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        onSave(formData)
        onClose()
    }

    const required = <span className='text-red-500 font-bold'>*</span>

    return (
        <div className="bg-white text-black p-8 absolute z-100 lg:w-2/5 md:w-4/5 rounded-xl flex flex-col items-center justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-9/10 h-auto">
            <img src={logo} alt='Ahoylove logo' className='w-40'/>
            <form className='w-full flex flex-col md:grid md:grid-cols-2 justify-between gap-4 max-w-xl py-4' onSubmit={handleSubmit}>
                <label className='col-span-1'>
                    Partner full name {required}
                    <input 
                        type='text' 
                        name='fullName' 
                        required 
                        value={formData.fullName} 
                        onChange={handleChange} 
                    />
                </label>

                <label className='col-span-1'>
                    Nickname (optional)
                    <input 
                        type='text' 
                        name='nickname' 
                        value={formData.nickname} 
                        onChange={handleChange} 
                    />
                </label>

                <label className='col-span-2'>
                    IMO Number {required}
                    <input 
                        type='number' 
                        name='imo' 
                        required 
                        value={formData.imo} 
                        onChange={handleChange} 
                    />
                </label>

                <label className='col-span-1'>
                    Date of departure (DD/MM/YYYY) {required}
                    <input 
                        type='date' 
                        name='departureDate' 
                        required 
                        value={formData.departureDate || ''} 
                        onChange={handleChange} 
                    />
                </label>

                <label className='col-span-1'>
                    Time of departure (optional)
                    <input 
                        type='time' 
                        name='departureTime' 
                        value={formData.departureTime || ''} 
                        onChange={handleChange} 
                    />
                </label>

                <label className='col-span-1'>
                    Contract length {required}
                    <input 
                        type='number' 
                        name='contractLength' 
                        required 
                        value={formData.contractLength || ''} 
                        onChange={handleChange} 
                    />
                </label>
                <FileUploadButton />
                <button 
                    type='submit' 
                    className="col-span-2 text-white bg-black py-2 px-4 mt-4 rounded-lg tracking-wide cursor-pointer" 
                    onSubmit={handleSubmit}
                >
                    Save details
                </button>
            </form>
        </div>
    )
}