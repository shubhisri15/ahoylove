export default function Weather({ temperature, icon }) {
    return (
        <div className='flex pt-4 items-center'>
            <p className='md:text-4xl text-2xl'>{temperature?.toFixed(1)} &deg;C</p>
            <img src={icon} alt='weather icon' className='md:w-20 w-12'/>
        </div>
    )
}