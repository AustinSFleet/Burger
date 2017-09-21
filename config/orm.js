var connection = require("../config/connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();

}

var orm = {

  getBurgers : function(eatStatus, cb) {
    var queryString = "SELECT * FROM burgers WHERE devoured = " + eatStatus + ";";
    connection.query(queryString, function(err, result){
      if (err) {
        throw err;
      }
      cb(result);
    })
  },
  createBurgers : function(burgerName, cb){
    var queryString = "INSERT INTO burgers (burger, devoured) VALUES (" + burgerName + ", 0)";
    connection.query(queryString, function (err, result){
      if (err) {
        throw err;
      }
      cb(result);
    })
  },
  eatBurgers : function(id, cb){
    var queryString = "UPDATE burgers SET devoured = 1 WHERE id = " + id;
    connection.query(queryString, function(err, result){
      cb(result);
    })
  },
  unEatBurgers : function(id, cb){
    var queryString = "UPDATE burgers SET devoured = 0 WHERE id = " + id;
    connection.query(queryString, function(err, result){
      cb(result);
  })
},
deleteBurgers : function (id, cb){
  var queryString = "DELETE FROM burgers WHERE id = " + id;
  connection.query(queryString, function (err, result){
    cb(result);
  })
}
  
    

};



module.exports = orm;