const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event) => {
  try {
    await client.connect();
    const database = client.db('book-api'); // Your database name
    const collection = database.collection('books'); // Your collection name

    if (event.httpMethod === 'GET') {
      const data = await collection.find({}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }

    if (event.httpMethod === 'POST') {
      const newData = JSON.parse(event.body);
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
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  } finally {
    await client.close();
  }
};
