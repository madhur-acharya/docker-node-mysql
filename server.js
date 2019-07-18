
const mysql = require('mysql');
const express= require('express');

let app= new express();

var connection = mysql.createConnection({
	host: 'sqldb',
	user: 'root',
	password: 'example',
	database: 'testdb'

});

connection.connect(function(err){
	if(!err)
	{
	 	console.log("Database is connected ... \n\n");  
	 	app.listen(3000, err => console.log(err ? err : "listening on port 3000..."));
	}
	else
	{
		console.log(err);  
	}
});

app.get('/', (request, response) => response.send("hello!"));

app.get('/get', function(request, response)
{
	connection.query("SELECT * FROM users", function (err, result, fields) {
		if (err) console.log(err);
		else response.send(result);
	});
})

app.get('/add', function(request, response)
{
	connection.query(`INSERT INTO users (name, email) VALUES ('${request.query.name}', '${request.query.email}')`, function (err, result, fields) {
		if (err) console.log(err);
		else response.send(result);
	});
})

//CMD tail -f /dev/null