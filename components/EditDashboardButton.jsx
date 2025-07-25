export default function EditDashboardButton({onClick, buttonText}) {
    return <button className='cursor-pointer bg-white text-black py-2 px-6 rounded-md font-bold hover:shadow-lg justify-self-center' onClick={onClick}>{buttonText}</button>
}