import GoogleMapWithMarkers from '@/components/markedMap'
import React from 'react'
import axios from 'axios'

export default function marker({ markers }: { markers: any }) {
    return (
        <div>
            <GoogleMapWithMarkers boards={markers} />
        </div>
    )
}


export async function getServerSideProps() {
    try {
        const response = await axios.get('http://localhost:9000/users/get-boards')

        return {
            props: {
                markers: response.data.boards || { location: [] },
            },
        };
    } catch (error) {
        console.error('Error fetching temperature data:', error);

        return {
            props: {
                markers: { location: [] },
            },
        };
    }
}