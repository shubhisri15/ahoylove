export default function Weather({ temperature, icon }) {
    return <div className='text-2xl pt-2'>{temperature?.toFixed(1)} &deg;C</div>
}