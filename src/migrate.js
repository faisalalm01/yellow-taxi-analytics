const pool = require("./db");
const crypto = require("crypto");

const generateShortUniqueId = (trip) => {
  const baseString = `${trip.pickup_datetime}_${trip.pickup_latitude}_${trip.pickup_longitude}`;
  return crypto.createHash("md5").update(baseString).digest("hex").slice(0, 8);
};

const saveTripsToDatabase = async (trips) => {
  try {
    for (const trip of trips) {
      const uniqueId = generateShortUniqueId(trip);

      const checkQuery = "SELECT 1 FROM trips WHERE unique_id = $1";
      const checkResult = await pool.query(checkQuery, [uniqueId]);

      if (checkResult.rows.length === 0) {
        const insertQuery = `
          INSERT INTO trips (
            unique_id, vendor_id, pickup_datetime, dropoff_datetime, passenger_count,
            trip_distance, pickup_longitude, pickup_latitude, dropoff_longitude,
            dropoff_latitude, payment_type, fare_amount, mta_tax, tip_amount,
            tolls_amount, total_amount, imp_surcharge, rate_code
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
          )
        `;
        const values = [
          uniqueId,
          trip.vendor_id,
          trip.pickup_datetime,
          trip.dropoff_datetime,
          trip.passenger_count,
          trip.trip_distance,
          trip.pickup_longitude,
          trip.pickup_latitude,
          trip.dropoff_longitude,
          trip.dropoff_latitude,
          trip.payment_type,
          trip.fare_amount,
          trip.mta_tax,
          trip.tip_amount,
          trip.tolls_amount,
          trip.total_amount,
          trip.imp_surcharge,
          trip.rate_code,
        ];

        await pool.query(insertQuery, values);
      }
    }
    console.log("Trips saved to database successfully.");
  } catch (error) {
    console.error("Error saving trips to database:", error.message);
    throw error;
  }
};

module.exports = { saveTripsToDatabase };
