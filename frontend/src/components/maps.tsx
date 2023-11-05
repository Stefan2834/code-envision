import React, { useEffect, useRef, useState } from 'react';

const GoogleMap = ({ onCoordsChange }: { onCoordsChange: any }) => {
    const mapContainerRef = useRef<any>(null);
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>();
    const [coords, setCoords] = useState([0, 0]);

    useEffect(() => {
        const loadMap = () => {
            const googleMapsScript = document.createElement('script');
            googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDyHJaizTAH70EhegZ5X2IApaEdN4GKzXI&libraries=places`;
            googleMapsScript.async = true;
            googleMapsScript.defer = true;

            googleMapsScript.addEventListener('load', () => {
                // The Google Maps API script has loaded, you can now use it.
                const map = new google.maps.Map(mapContainerRef.current, {
                    center: { lat: 45, lng: 26 }, // You can set your default center here
                    zoom: 14,
                });

                map.addListener('click', (event: google.maps.KmlMouseEvent) => {
                    if (markerRef.current) {
                        markerRef.current.setMap(null);
                    }

                    const marker = new google.maps.Marker({
                        position: event.latLng,
                        map: mapRef.current,
                    });

                    markerRef.current = marker;

                    const latitude = event?.latLng?.lat() || 0;
                    const longitude = event?.latLng?.lng() || 0;
                    alert(`Waypoint added at: ${latitude}, ${longitude}`);
                    setCoords([latitude, longitude]);
                    onCoordsChange([latitude, longitude]);
                });

                mapRef.current = map;
            });

            document.head.appendChild(googleMapsScript);
        };

        loadMap();
    }, []);

    return (
        <div className='bg-red-400'>
            <div ref={mapContainerRef} style={{ width: '1500px', height: '700px' }}></div>
        </div>
    );
};

export default GoogleMap;
