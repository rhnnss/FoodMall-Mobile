var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const engines = require('consolidate');
const paypal = require('paypal-rest-sdk');

app.engine('ejs', engines.ejs);
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(
  cors({
    origin: ['http://192.168.100.12:4090'],
    methods: ['GET', 'POST'],
    credentials: true, //Enable Cookies
  }),
);
app.use(cookieParser());
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

// ---------------------------------- Paypal Integrated ----------------------------------

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'AZHCgaW9ZqAJCeSMDGA-HjyeKB-Vx-8uXwc6JQVAg4cizfdLapBUlb0KrBEY14jaR1mmyz1OYHDtgWSS',
  client_secret:
    'EHL7cQTF4O8Mag_bSFRsAljE1N2d2IgqAXnQx4Wvit46aB6AQ4L6Da0ETk8jHuUk5Ag7Apa9LQpr56hN',
});

let totalPrice = '';
const randomHarga = (p) => {
  return (totalPrice = p);
};

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/paypal', (req, res) => {
  let data = req.body;
  let harga = data.harga;
  randomHarga(harga);

  var create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:4090/success',
      cancel_url: 'http://localhost:4090/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'FoodMall INC',
              sku: 'Foods',
              price: totalPrice,
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: totalPrice,
        },
        description: "Don't forget to screenshot invoice in the Application",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log('Create Payment Response');
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
});

app.get('/success', (req, res) => {
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;

  var execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: totalPrice,
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (
    error,
    payment,
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log('Get Payment Response');
      console.log(JSON.stringify(payment));
      res.render('success');
    }
  });
});

app.get('/cancel', (req, res) => {
  res.render('cancel');
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

      results.results = rows.slice(startIndex, endIndex);
      res.send(results);
    }
  });
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    con.query(
      'INSERT INTO users (username, password) VALUES (?,?)',
      [username, hash],
      (error, result) => {
        console.log(error);
        console.log(result);
      },
    );
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  con.query(
    'SELECT * FROM users WHERE username=?;',
    username,
    (err, result) => {
      if (err) {
        res.send({err: err});
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            // Token
            const id = result[0].id;
            const token = jwt.sign({id}, 'foodmallindonesia', {
              expiresIn: 300,
            });

            // req.session.user = result;

            // if true send json with object
            res.json({
              auth: true,
              token: token,
              result: result,
            });
          } else {
            res.json({
              auth: false,
              message: 'Wrong username/password combination',
            });
          }
        });
      } else {
        res.json({auth: false, message: 'No user exists!'});
      }
    },
  );
});

// ------------------------------------ Permission Order Admin for Manage Database ----------------------------------------

app.get('/dataPesanan', (req, res) => {
  con.query('SELECT * FROM datapesanan', (error, rows, fields) => {
    if (!!error) console.log(error);
    else {
      res.send(rows);
    }
  });
});

app.get('/OrderAdmin', (req, res) => {
  con.query('SELECT * FROM newproducts', (error, rows, fields) => {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.post('/OrderAdmin', (req, res) => {
  con.query(
    'insert into newproducts set ? ',
    req.body,
    (error, rows, fields) => {
      if (error) console.log(error);
      else {
        console.log(rows);
        res.send(JSON.stringify(rows));
      }
    },
  );
});

//------------------------------ Search from id ------------------------------
app.get('/OrderAdmin/:id', (req, res) => {
  con.query(
    'SELECT * FROM newproducts where id=? ',
    req.params.id,
    (error, rows, fields) => {
      if (error) console.log(error);
      else {
        console.log(rows);
        res.send(JSON.stringify(rows));
      }
    },
  );
});

//------------------------------ Delete ------------------------------
app.delete('/OrderAdmin/:id', (req, res) => {
  console.log('Params' + req.params.id);
  con.query(
    'DELETE FROM newproducts where id=? ',
    req.params.id,
    (error, rows, fields) => {
      if (error) console.log(error);
      else {
        console.log(rows);
        res.end('Succes Delete');
      }
    },
  );
});

//------------------------------ Update ------------------------------
app.put('/OrderAdmin', (req, res) => {
  con.query(
    'UPDATE newproducts SET background=?, icon=?, nama=?, harga=?, deskripsi=?, star=? WHERE id=? ',
    [
      req.body.background,
      req.body.icon,
      req.body.nama,
      req.body.harga,
      req.body.deskripsi,
      req.body.star,
      req.body.id,
    ],
    (error, rows, fields) => {
      if (error) console.log(error);
      else {
        console.log(rows);
        res.end(JSON.stringify(rows));
      }
    },
  );
});

// ------------------------------------ Permission Courier Admin for Manage Database ----------------------------------------
app.get('/courierPackage', (req, res) => {
  con.query('select * from datapengiriman', (error, rows, fields) => {
    if (error) console.log(error);
    else {
      res.send(rows);
    }
  });
});

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
