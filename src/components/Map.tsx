import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useCustomerStore } from '../store/useCustomerStore';
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
  const defaultCenter = [40.7128, -74.0060] as [number, number]; // NYC coordinates

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
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