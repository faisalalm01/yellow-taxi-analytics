import React from "react";

const TripDetails = ({ trip }) => {
  return (
    <div className="absolute top-4 right-4 bg-white p-4 shadow-lg rounded">
      <h2 className="text-lg font-bold mb-2">Trip Details</h2>
      <p><strong>Pickup DateTime:</strong> {trip.pickup_datetime}</p>
      <p><strong>Dropoff DateTime:</strong> {trip.dropoff_datetime}</p>
      <p><strong>Fare:</strong> ${trip.fare_amount}</p>
      <p><strong>Distance:</strong> {trip.trip_distance} miles</p>
      <p><strong>Payment:</strong> {trip.payment_type}</p>
    </div>
  );
};

export default TripDetails;
