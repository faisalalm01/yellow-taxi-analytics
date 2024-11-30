const tripService = require("../services/tripService");

exports.getTrip = (req, res) => {
  try {
    return tripService.getDataService(req, res);
  } catch (error) {
    console.log(error);
  }
};

exports.getDetailTrip = (req, res) => {
  try {
    return tripService.getDetailTripService(req, res);
  } catch (error) {
    console.log(error);
  }
};

// CREATE TABLE IF NOT EXISTS public.trips
// (
//     unique_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
//     vendor_id character varying(10) COLLATE pg_catalog."default",
//     pickup_datetime timestamp without time zone,
//     dropoff_datetime timestamp without time zone,
//     passenger_count integer,
//     trip_distance double precision,
//     pickup_longitude double precision,
//     pickup_latitude double precision,
//     dropoff_longitude double precision,
//     dropoff_latitude double precision,
//     payment_type character varying(10) COLLATE pg_catalog."default",
//     fare_amount double precision,
//     mta_tax double precision,
//     tip_amount double precision,
//     tolls_amount double precision,
//     total_amount double precision,
//     imp_surcharge double precision,
//     rate_code character varying(10) COLLATE pg_catalog."default",
//     CONSTRAINT trips_pkey PRIMARY KEY (id),
//     CONSTRAINT trips_unique_id_key UNIQUE (unique_id)
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.trips
//     OWNER to postgres;