const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

const uri = 'mongodb://localhost:27017';
const dbName = 'foujaan';
const collectionName = 'series';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/series', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const series = await collection.find({}).toArray();
        res.json(series);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching series' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
