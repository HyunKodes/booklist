const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '..', 'db.json');

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === 'GET') {
      const data = readFileSync(dbFilePath, 'utf-8');
      return {
        statusCode: 200,
        body: data,
      };
    }

    if (event.httpMethod === 'POST') {
      const newData = JSON.parse(event.body);
      writeFileSync(dbFilePath, JSON.stringify(newData, null, 2));
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
  }
};
