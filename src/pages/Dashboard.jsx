import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Filter from "../components/Filter";
import TripDetails from "../components/DetailTrip";
import Pagination from "../components/Pagination";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filter, setFilter] = useState({
    start_time: "",
    end_time: "",
    min_fare: "",
    max_fare: "",
    min_distance: "",
    max_distance: "",
    payment_type: "", // Added payment filter
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchTrips = async () => {
    const { page, limit } = pagination;
    const query = new URLSearchParams({
      ...filter,
      page,
      limit,
    }).toString();

    const response = await fetch(`http://localhost:5000/api/trip?${query}`);
    const data = await response.json();

    if (response.ok) {
      setTrips(data.data);
      setPagination((prev) => ({ ...prev, total: data.total }));
    } else {
      console.error("Failed to fetch trips:", data.message);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [filter, pagination.page]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">NYC Taxi Map</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <div className="relative">
        <Map trips={trips} setSelectedTrip={setSelectedTrip} />
        {selectedTrip && <TripDetails trip={selectedTrip} />}
      </div>
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        totalItems={pagination.total}
      />
    </div>
  );
};

export default Home;
