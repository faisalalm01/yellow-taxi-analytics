import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ trips, setSelectedTrip }) => {
  const [addressMap, setAddressMap] = useState({});

  // Fetch street names for given coordinates
  const fetchStreetName = async (lat, lon) => {
    const key = `${lat},${lon}`;
    if (addressMap[key]) return addressMap[key]; // Return cached result if available

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      const streetName = data.address.road || "Unknown Location";

      // Update the address map
      setAddressMap((prev) => ({
        ...prev,
        [key]: streetName,
      }));

      return streetName;
    } catch (error) {
      console.error("Error fetching street name:", error);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    // Preload street names for all markers
    trips.forEach((trip) => {
      const { pickup_latitude, pickup_longitude } = trip;
      fetchStreetName(pickup_latitude, pickup_longitude);
    });
  }, [trips]);

  return (
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {trips.map((trip) => (
        <Marker
          key={trip.unique_id}
          position={[trip.pickup_latitude, trip.pickup_longitude]}
          eventHandlers={{
            click: () => setSelectedTrip(trip),
          }}
        >
          <Popup>
            <div>
              <p>Fare: ${trip.fare_amount}</p>
              <p>Distance: {trip.trip_distance} miles</p>
              <p>
                Location:{" "}
                {addressMap[
                  `${trip.pickup_latitude},${trip.pickup_longitude}`
                ] || "Loading..."}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
