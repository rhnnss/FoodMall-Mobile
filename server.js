var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'foodmall',
});

var server = app.listen(4090, () => {
  var host = server.address().address;
  var port = server.address().port;
});

con.connect((error) => {
  if (error) console.log(`${error} Ada yang salah!`);
  else console.log('connected');
});

// ---------------------------------- Get Data from Mysql ----------------------------------
app.get('/randomProducts', (req, res) => {
  con.query('select * from randomProducts', (error, rows, fields) => {
    if (error) console.log(error);
    else {
      res.send(rows);
    }
  });
});

app.get('/newProducts', (req, res) => {
  con.query('select * from newproducts', (error, rows, fields) => {
    if (error) console.log(error);
    else {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || +rows.length;

      const startIndex = (page - 1) * limit; //Skip 5 item
      const endIndex = page * limit;

      const results = {};
      results.current = {
        page: page,
        limit: limit,
      };
      results.next = {
        page: page + 1,
        limit: limit,
      };
      results.previous = {
        page: page - 1,
        limit: limit,
      };

      console.log(+rows.length);

      results.results = rows.slice(startIndex, endIndex);
      res.send(results);
    }
  });
});

// app.get('/categoryBreakfast', (req, res) => {
//   con.query('select * from  categorybreakfast', (error, rows, fields) => {
//     if (error) console.log(error);
//     else {
//       res.send(rows);
//     }
//   });
// });

// app.get('/categoryBeef', (req, res) => {
//   con.query('select * from  categorybeef', (error, rows, fields) => {
//     if (error) console.log(error);
//     else {
//       res.send(rows);
//     }
//   });
// });

// app.get('/categoryChicken', (req, res) => {
//   con.query('select * from  categorychicken', (error, rows, fields) => {
//     if (error) console.log(error);
//     else {
//       res.send(rows);
//     }
//   });
// });

// app.get('/categoryFish', (req, res) => {
//   con.query('select * from  categoryfish', (error, rows, fields) => {
//     if (error) console.log(error);
//     else {
//       res.send(rows);
//     }
//   });
// });

// app.get('/categoryIceCream', (req, res) => {
//   con.query('select * from  categoryicecream', (error, rows, fields) => {
//     if (error) console.log(error);
//     else {
//       res.send(rows);
//     }
//   });
// });

// app.get('/categorySnacks', (req, res) => {
//   con.query('select * from  categorysnacks', (error, rows, fields) => {
//     if (error) console.log(error);
//     else {
//       res.send(rows);
//     }
//   });
// });

// app.get('/testRole', (req, res) => {
//   con.query('select * from  testrole', (error, rows, fields) => {
//     if (error) console.log(error);
//     else {
//       res.send(rows);
//     }
//   });
// });

// ---------------------------------- Post Data to Mysql ----------------------------------
app.post('/deliveryAddress', (req, res) => {
  const name = req.body.name;
  const delivery = req.body.delivery;

  con.query(
    'INSERT INTO deliveryaddress (nama, alamat) VALUES (?,?) ',
    [name, delivery],
    (err, rows, fields) => {
      res.send(JSON.stringify(rows));
    },
  );
});
