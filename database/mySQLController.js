const mysql = require('mysql');
require('dotenv').config();

const mySQLCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

function incertTestContent() {
    //create a new promise
    return new Promise((resolve, reject) => {
        // Create a connection object
        const connection = mysql.createConnection(mySQLCredentials);
        // Connect to the MySQL database
        connection.connect((error) => {
            if (error) {
                console.error('Error connecting to MySQL database:', error);
                reject(error);
            }else{
                console.log('Connected to MySQL database!');
                //create sql to execute
                const sqlReq = `
                    INSERT INTO test (name, calories, fat, carbs, protein)
                    VALUES (?, ?, ?, ?, ?);
                `;
                const values = ['Gingerbread', 356, 16.0, 49, 3.9];
                // Execute a query
                connection.query(sqlReq, values, (error, results, fields) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    }else{
                        //console.log('Query results: \n', results); // show the data in console server
                        resolve(results[0]);
                    }
                    
                });
                // End the connection
                connection.end();
            }
            
        });
    });
}

function createTestTable() {
    //create a new promise
    return new Promise((resolve, reject) => {
        // Create a connection object
        const connection = mysql.createConnection(mySQLCredentials);
        // Connect to the MySQL database
        connection.connect((error) => {
            if (error) {
                console.error('Error connecting to MySQL database:', error);
                reject(error);
            }else{
                console.log('Connected to MySQL database!');
                //create sql to execute
                const sqlReq = `
                    CREATE TABLE IF NOT EXISTS test (
                        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        calories INT NOT NULL,
                        fat INT NOT NULL,
                        carbs INT NOT NULL,
                        protein INT NOT NULL
                    );
                `;
                // Execute a query
                connection.query(sqlReq, (error, results, fields) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    }else{
                        //console.log('Query results: \n', results); // show the data in console server
                        resolve(results);
                    }
                    
                });
                // End the connection
                connection.end();
            }
            
        });
    });
}

function getTestTable() {
    //create a new promise
    return new Promise((resolve, reject) => {
        // Create a connection object
        const connection = mysql.createConnection(mySQLCredentials);
        // Connect to the MySQL database
        connection.connect((error) => {
            if (error) {
                console.error('Error connecting to MySQL database:', error);
                reject(error);
            }else{
                //console.log('Connected to MySQL database!');
                //create sql to execute
                const sqlReq = `
                SELECT * FROM test;
                `;
                // Execute a query
                connection.query(sqlReq, (error, results, fields) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    }else{
                        //console.log('Query results: \n', results); // show the data in console server
                        resolve(results);
                    }
                    
                });
                // End the connection
                connection.end();
            }
            
        });
    });
}

function updateProtein() {
    //create a new promise
    return new Promise((resolve, reject) => {
        // Create a connection object
        const connection = mysql.createConnection(mySQLCredentials);
        // Connect to the MySQL database
        connection.connect((error) => {
            if (error) {
                console.error('Error connecting to MySQL database:', error);
                reject(error);
            }else{
                console.log('Connected to MySQL database!');
                //create sql to execute
                const sqlReq = `
                    UPDATE test
                    SET protein = 4
                    WHERE id = 0;

                `;
                // Execute a query
                connection.query(sqlReq, (error, results, fields) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    }else{
                        //console.log('Query results: \n', results); // show the data in console server
                        resolve(results);
                    }
                    
                });
                // End the connection
                connection.end();
            }
            
        });
    });
}

/*updateProtein()
    .then((results) => {
        console.log(results[0]);
    })
    .catch((error) => {
        console.error(error);
    })
*/

const controller = {
    createTestTable: createTestTable,
    incertTestContent: incertTestContent,
    getTestTable: getTestTable
}
export default controller;