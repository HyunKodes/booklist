const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event) => {
  console.log('Event:', event);
  try {
    await client.connect();
    const database = client.db('book-api'); // Your database name
    const collection = database.collection('books'); // Your collection name

    if (event.httpMethod === 'GET') {
      const data = await collection.find({}).toArray();
      console.log('Data:', data);
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }

    if (event.httpMethod === 'POST') {
      const newData = JSON.parse(event.body);
      console.log('New Data:', newData);
      await collection.insertOne(newData);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Data saved successfully' }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  } finally {
    await client.close();
  }
};
