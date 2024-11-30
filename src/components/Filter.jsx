import React from "react";

const Filter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="datetime-local"
        name="start_time"
        value={filter.start_time}
        onChange={handleChange}
        placeholder="Start Time"
        className="border p-2"
      />
      <input
        type="datetime-local"
        name="end_time"
        value={filter.end_time}
        onChange={handleChange}
        placeholder="End Time"
        className="border p-2"
      />
      <input
        type="number"
        name="min_fare"
        value={filter.min_fare}
        onChange={handleChange}
        placeholder="Min Fare"
        className="border p-2"
      />
      <input
        type="number"
        name="max_fare"
        value={filter.max_fare}
        onChange={handleChange}
        placeholder="Max Fare"
        className="border p-2"
      />
      <input
        type="number"
        name="min_distance"
        value={filter.min_distance}
        onChange={handleChange}
        placeholder="Min Distance"
        className="border p-2"
      />
      <input
        type="number"
        name="max_distance"
        value={filter.max_distance}
        onChange={handleChange}
        placeholder="Max Distance"
        className="border p-2"
      />
      <select
        name="payment_type"
        value={filter.payment_type}
        onChange={handleChange}
        className="border p-2"
      >
        <option value="">All Payments</option>
        <option value="CRD">Credit Card</option>
        <option value="CSH">Cash</option>
        <option value="NOC">No Charge</option>
        <option value="DIS">Dispute</option>
        <option value="UNK">Unknown</option>
      </select>
    </div>
    );
  };
  
  export default Filter;
  