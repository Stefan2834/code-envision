import GoogleMapWithMarkers from '@/components/markedMap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function marker() {
    const [marker, setMarker] = useState([])
    useEffect(() => {
        axios.get('http://localhost:9000/users/get-boards').then(data => { setMarker(data.data.boards); console.log(data.data.boards) })
    }, [])
    return (
        <div>
            <GoogleMapWithMarkers boards={marker} />
        </div>
    )
}
