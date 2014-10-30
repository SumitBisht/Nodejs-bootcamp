var mysql = require('mysql');
/*
 * Saves the connection properties inline
 * for larger apps., consider using a utility file
 */
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mytestdb'
});
/*
 * GET the list of all employees.
 */
exports.list = function(req, res){
  console.log('Listing employees');
  connection.query('select * from employees', function(err, rows){
  	if(err){
  		console.log('Error: '+err);
  		res.render('errorPage', {title: "Error Page", error: err});
  	}
  	else{
  		console.log(JSON.stringify(rows));
  		res.render('employeeList', {title: "Employee Listing", data: rows});
  	}
  });
};