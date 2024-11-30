/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Cache untuk menyimpan nama jalan
const streetCache = {};

// Fungsi untuk mengambil nama jalan dari API Nominatim
const fetchStreetName = async (lat, lon, retries = 3) => {
  const key = `${lat},${lon}`;
  if (streetCache[key]) {
    return streetCache[key]; // Mengembalikan hasil dari cache jika sudah ada
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  while (retries > 0) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const street = data.address?.road || "Street name not available";
      streetCache[key] = street; // Simpan ke cache
      return street;
    } catch (error) {
      retries -= 1;
      console.warn("Retrying fetch...", retries, error.message);
      if (retries === 0) {
        console.error("Failed after retries:", error.message);
        return "Street name not available";
      }
    }
  }
};

const Map = ({ trips, setSelectedTrip }) => {
  useEffect(() => {
    const fetchAllStreetNames = async () => {
      for (const trip of trips) {
        try {
          const streetName = await fetchStreetName(
            trip.pickup_latitude,
            trip.pickup_longitude
          );
          console.log(`Street for ${trip.unique_id}: ${streetName}`);
        } catch (error) {
          console.error("Error fetching street name:", error.message);
        }
      }
    };

    fetchAllStreetNames();
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
                Street:{" "}
                {streetCache[`${trip.pickup_latitude},${trip.pickup_longitude}`] ||
                  "Loading..."}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
