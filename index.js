const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.bz8bjqc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
	const menuCollection = client.db("BistroDB").collection("menu")
	const reviewsCollection = client.db("BistroDB").collection("reviews")

	app.get('/menu', async(req, res) => {
		const result = await menuCollection.find().toArray()
		res.send(result)
	})
	app.get('/reviews', async(req, res) => {
		const result = await reviewsCollection.find().toArray()
		res.send(result)
	})
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
	res.send("Bistro boss Restaurant server is Running!!")
})
app.listen(port, () => {
	console.log(`server is running port ${port}`);
})