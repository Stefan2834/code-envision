import axios from 'axios'
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home({ temperature, temperatureAvg, humidity, humidityAvg, particle }:
    { temperature: any, temperatureAvg: any, humidity: any, humidityAvg: any, particle: any }) {

    const router = useRouter()
    return (
        <div className="w-full h-screen test flex items-center justify-center bg-slate-300">
            <div className="w-1/3 h-full flex items-center justify-center flex-col">
                <Button className='text-lg font-semibold m-5 p-4' onClick={() => router.push("/marker")}>Vizualizare senzori</Button>
                <Button className='text-lg font-semibold m-5 p-4' onClick={() => router.push("/admin")}>Adăugare senzor</Button>
            </div>
            <div className="w-1/3 bg-blue-400 h-full flex items-center justify-start flex-col p-4">
                Temperatură:
                <br />
                <div className='text-4xl font-semibold m-3'>
                    {temperature}°C {((temperature * 9 / 5) + 32).toFixed(2)} °F
                </div>
                Media zilei de astăzi:
                <br />
                <div className='text-4xl font-semibold m-3'>
                    {temperatureAvg}°C {((temperatureAvg * 9 / 5) + 32).toFixed(2)} °F
                </div>
                Umiditate:
                <br />
                <div className='text-4xl font-semibold m-3'>
                    {humidity}%
                </div>
                Umiditatea medie de astăzi:
                <br />
                <div className='text-4xl font-semibold m-3'>
                    {humidityAvg}%
                </div>
            </div>
            <div className="w-1/3  h-full flex items-center justify-start flex-col p-4">
                Particule din aer:
                <br />
                <div className='text-4xl font-semibold m-3'>
                    {particle}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('http://localhost:9000/users/get-temp')
        console.log(response.data)
        return {
            props: {
                temperature: response.data.temperature || -1,
                temperatureAvg: response.data.temperatureAvg?.toFixed(2) || -1,
                humidity: response.data.humidity?.toFixed(2) || -1,
                humidityAvg: response.data.humidityAvg?.toFixed(2) || -1,
                particle: response.data.particle || -1
            },
        };
    } catch (error) {
        console.error('Error fetching temperature data:', error);

        return {
            props: {
                temperature: -1,
                temperatureAvg: -1,
                humidity: -1,
                humidityAvg: -1,
                particle: -1
            },
        };
    }
}