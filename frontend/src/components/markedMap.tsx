import React, { useEffect, useRef } from 'react';

const GoogleMapWithMarkers = ({ boards }: { boards: any }) => {
    const mapContainerRef = useRef<any>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        const loadMap = () => {
            const googleMapsScript = document.createElement('script');
            googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDyHJaizTAH70EhegZ5X2IApaEdN4GKzXI&libraries=places`;
            googleMapsScript.async = true;
            googleMapsScript.defer = true;

            googleMapsScript.addEventListener('load', () => {
                const map = new google.maps.Map(mapContainerRef.current, {
                    center: { lat: 45, lng: 26 }, // You can set your default center here
                    zoom: 14,
                });

                // Create markers for each board
                boards.forEach((board: any) => {
                    const [latitude, longitude] = board.location;
                    new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: map,
                    });
                });

                mapRef.current = map;
            });

            document.head.appendChild(googleMapsScript);
        };

        loadMap();
    }, [boards]);

    return (
        <div className="bg-red-400">
            <div ref={mapContainerRef} style={{ width: '1500px', height: '700px' }}></div>
        </div>
    );
};

export default GoogleMapWithMarkers;
