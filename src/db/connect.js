const { MongoClient } = require('mongodb');

let connection;

async function initiateConnection() {
    // Create a new mongo client and connect
    connection = new MongoClient('mongodb+srv://mohambade:twWdmJkqSlOFwEDj@nrhtshdm.aiirqxo.mongodb.net/');
    await connection.connect();
    console.log('Connected to database');
}

// Connect to database on startup
initiateConnection();

// Export the desired database
module.exports = connection.db('resume');