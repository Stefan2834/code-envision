import { useState } from 'react'
import axios from 'axios'

export default function Home({ temperature, average }: { temperature: any, average: any }) {
    const [temp, setTemp] = useState(temperature)
    const [avg, setAvg] = useState(average)
    return (
        <div className="w-full h-screen test flex items-center justify-center bg-slate-300">
            <div className="w-1/3 h-full"></div>
            <div className="w-1/3 bg-blue-400 h-full flex items-center justify-start flex-col p-4">
                Temperatură: 
                <br />
                <div className='text-4xl font-semibold m-3'>
                    {temp}°C {((temp * 9/5) + 32).toFixed(2)} °F
                </div>
                Media zilei de astăzi: 
                <br />
                <div className='text-4xl font-semibold m-3'>
                    {average}°C {((average * 9/5) + 32).toFixed(2)} °F
                </div>
            </div>
            <div className="w-1/3 h-full"></div>
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('http://localhost:9000/users/get-temp')

        return {
            props: {
                temperature: response.data.temp,
                average: response.data.average?.toFixed(2)
            },
        };
    } catch (error) {
        console.error('Error fetching temperature data:', error);

        return {
            props: {
                temperature: -1,
            },
        };
    }
}