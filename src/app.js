const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', mainRoutes);
app.get('/api', async (req, res) => {
    res.send({message: 'api works'})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const axios = require("axios");
const { saveTripsToDatabase } = require("./migrate");
const API_URL = require('./utils/API');


const fetchDataAndSave = async () => {
  try {
    const response = await axios.get(API_URL);

    const tripsData = response.data;

    await saveTripsToDatabase(tripsData);

    console.log("save data to database");
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

fetchDataAndSave();
