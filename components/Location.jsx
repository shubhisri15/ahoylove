export default function Location({ city, country, name }) {
    if (!city || !country) {
        return <div>Loading..</div>
    }
    return (

        <div className='flex flex-col'>
            <p className="text-sm">{name} is currently sailing over</p>
            <h2 className="text-3xl">{`${city}, ${country}`}</h2>
        </div>
    )
}