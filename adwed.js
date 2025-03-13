const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017';  // MongoDB connection string
const dbName = 'netflix_db'; 
const collectionName = 'shows';

// MongoDB client setup
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public')); // Serve static files from the 'public' directory

// Endpoint to fetch shows from MongoDB
app.get('/getShows', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to database');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    const shows = await collection.find({}).toArray();
    res.json(shows);  // Send the data to the front-end
  } catch (err) {
    console.error('Error fetching shows:', err);
    res.status(500).json({ message: 'Error fetching shows from MongoDB' });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
