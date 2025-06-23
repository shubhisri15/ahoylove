export default function Location({ destination, lastUpdated='', name }) {
    if (!destination) {
        return <div>Loading..</div>
    }
    return (

        <div className='flex flex-col text-center md:text-left pt-6 md:pt-0'>
            <p className="md:text-md text-sm">{name} is currently sailing towards</p>
            <h2 className="text-4xl">{destination}</h2>
            <p className='text-xs py-2 text-indigo-400/50'>(Last updated: {lastUpdated})</p>
        </div>
    )
}