const axios = require("axios");
const crypto = require("crypto");
const API_URL = require("../utils/API");
const { saveTripsToDatabase } = require("../migrate");
const pool = require("../db");

exports.getDataService = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      start_time,
      end_time,
      payment_type,
      min_fare,
      max_fare,
      min_distance,
      max_distance,
    } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM trips WHERE 1=1";
    const queryParams = [];

    if (start_time) {
      queryParams.push(start_time);
      query += ` AND pickup_datetime >= $${queryParams.length}`;
    }

    if (end_time) {
      queryParams.push(end_time);
      query += ` AND dropoff_datetime <= $${queryParams.length}`;
    }

    if (payment_type) {
      query += " AND payment_type = $1";
      queryParams.push(payment_type);
    }
    if (min_fare) {
      query += ` AND fare_amount >= $${queryParams.length + 1}`;
      queryParams.push(min_fare);
    }
    if (max_fare) {
      query += ` AND fare_amount <= $${queryParams.length + 1}`;
      queryParams.push(max_fare);
    }
    if (min_distance) {
      query += ` AND trip_distance >= $${queryParams.length + 1}`;
      queryParams.push(min_distance);
    }
    if (max_distance) {
      query += ` AND trip_distance <= $${queryParams.length + 1}`;
      queryParams.push(max_distance);
    }

    query += ` LIMIT $${queryParams.length + 1} OFFSET $${
      queryParams.length + 2
    }`;
    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    res.status(200).json({
      total: result.rowCount,
      page: parseInt(page),
      limit: parseInt(limit),
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching trips:", error.message);
    res.status(500).json({ message: "Failed to fetch trips data" });
  }
};

exports.getDetailTripService = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM trips WHERE unique_id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `Trip with ID ${id} not found.` });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching trip details:", error.message);
    res.status(500).json({ message: "Failed to fetch trip details" });
  }
};
