import GetShipData from "./getShipData"

export default function App() {
    return (
        <div className='flex flex-col justify-between items-center h-screen'>
            <div className="flex justify-between w-full">
                <div>Location + Weather</div>
                <div>Logo</div>
            </div>
            <div>Time <GetShipData /></div>
            <div className="flex justify-between w-full">
                <div>Edit Dashboard</div>
                <div>Homecoming</div>
            </div>
        </div>
    )
}