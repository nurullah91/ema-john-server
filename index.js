const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleWare
app.use(cors())
app.use(express())




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gspcn8d.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
       
        const productCollection = client.db('emaJohn').collection('products');


        app.get('/products', async(req, res) =>{
            const result = await productCollection.find().toArray();

            res.send(result);
        })

        app.get('/totalProducts', async(req, res)=>{
            const result = await productCollection.estimatedDocumentCount();
            res.send({totalProducts: result});
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Ema is shopping and wasting money')
})

app.listen(port, () => {
    console.log(`Ema is running on the port ${port}`);
})