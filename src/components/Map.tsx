import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useCustomerStore } from '../store/useCustomerStore';
import { searchAddress } from '../utils/geocoding';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function Map() {
  const customers = useCustomerStore((state) => state.customers);
  const [center, setCenter] = useState<[number, number]>([52.1205, 11.4123]); // Approximate coordinates for Hohe Börde

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const location = await searchAddress('Braunschweiger Str. 1, 39326 Hohe Börde');
        if (location) {
          setCenter([location.lat, location.lon]);
        }
      } catch (error) {
        console.error('Error setting initial location:', error);
      }
    };

    initializeMap();
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-[600px] rounded-lg shadow-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {customers.map((customer) => (
        <Marker
          key={customer.id}
          position={[customer.latitude, customer.longitude]}
          icon={customIcon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold mb-1">{customer.name}</h3>
              <p>{customer.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}