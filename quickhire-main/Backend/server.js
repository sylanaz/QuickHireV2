const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();


const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const allowedOrigins = ['https://quickhire-seven.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is allowed, or allow requests with no origin (e.g., file://)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json({ limit: "10mb" }));

let db = new sqlite3.Database("users.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the access database");
});



app.post("/uploadUserinfo", upload.single("file"), (req, res) => {
  // Access the user info sent in the request body
  const {
    firstname,
    lastname,
    nickname,
    sex,
    telnumber,
    birthdate,
    national,
    area,
    degree,
    workexp,
    thailevel,
    englevel,
    vehicle,
    talent,
    email,
  } = req.body;

  // Access the uploaded file information (if it exists)
  const selectedImage = req.file;

  const fs = require("fs");
  fs.readFile(selectedImage.path, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading file" });
    }

    // Now you have the binary data in the 'data' variable
    // Perform the database update
    db.run(
      `UPDATE users SET img = ? , firstname = ?, lastname = ?, nickname = ?, sex = ?, telnumber = ?, birthdate = ?, national = ?, area = ?, degree = ?, workexp = ?, thailevel = ?, englevel = ?, vehicle = ?, talent = ?, newuser = 'old' WHERE email = ?`,
      [data, firstname, lastname, nickname, sex, telnumber, birthdate, national, area, degree, workexp, thailevel, englevel, vehicle, talent, email],
      (err) => {
        if (err) {
          console.error("Error updating database:", err);
          
        }
        console.log("Success Update");
      
      }
    );
  });

  // Send a response back to the client
  res.json({ message: "Data and file successfully received!" });
});

app.post("/uploadShopinfo", upload.single("file"), (req, res) => {
  // Access the user info sent in the request body
  const {
    firstname,
    lastname,
    shopname,
    location,
    timework,
    money,
    lat,
    long,
    welfare,
    email,
    telnumber
  } = req.body;

  // Access the uploaded file information (if it exists)
  const selectedImage = req.file;

  const fs = require("fs");
  fs.readFile(selectedImage.path, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading file" });
    }

    // Now you have the binary data in the 'data' variable
    // Perform the database update
    db.run(
      `UPDATE shops SET img = ? , firstname = ?, lastname = ?, shopname = ?, location = ?, timework = ?, money = ?, lat = ?, long = ?, welfare = ?, telnumber = ?, newuser = 'old' WHERE email = ?`,
      [data, firstname, lastname, shopname, location, timework, money,lat,long,welfare,telnumber,email],
      (err) => {
        if (err) {
          console.error("Error updating database:", err);
          
        }
        console.log("Success Update");
      
      }
    );
  });

  // Send a response back to the client
  res.json({ message: "Data and file successfully received!" });
});




app.post('/uploadJob', upload.single('img'), async (req, res) => {

  const shopname = req.body.shopname;
  const workposition = req.body.workposition;
  const money = req.body.money;
  const jobdesc = req.body.jobdesc;
  const timework = req.body.timework;
  const welfare = req.body.welfare;
  const peopleneed = req.body.peopleneed;
  const lat = req.body.lat;
  const long = req.body.long;
  const location = req.body.location;
  const email = req.body.email;
  const minilocation = req.body.minilocation;

  // You can access the uploaded image as req.file
  const imgPath = req.file.path;

  const fs = require("fs");
  fs.readFile(imgPath, (err, data) => {
      if (err) {
          console.error("Error reading file:", err);
          return res.status(500).json({ error: "Error reading file" });
      }

      // Insert the data into the database
      db.run(
          `INSERT INTO jobs (shopname, workposition, money, jobdesc, timework, welfare, peopleneed, lat, long, location, email, img,minilocation) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
          [shopname, workposition, money, jobdesc, timework, welfare, peopleneed, lat, long, location, email, data,minilocation],
          function (err) {
              if (err) {
                  console.error('Error inserting data:', err.message);
                  res.status(500).json({ error: 'An error occurred while processing the data' });
              } else {
                  console.log(`A new job with ID ${this.lastID} has been inserted.`);
                  res.status(200).json({ message: 'Data received successfully' });
              }
          }
      );
  }); // Corrected placement of closing parenthesis for fs.readFile
}); // Corrected placement of closing parenthesis for app.post





app.get('/alljobs', (req, res) => {
  db.all('SELECT * FROM jobs', (err, jobs) => {
    if (err) {
      console.error('Error fetching jobs:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ data: jobs });
    }
  });
});


app.get("/getUserinfo/:email", (req, res) => {
  const email = req.params.email;

  // Perform the database query to fetch user data based on the email
  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, row) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Error querying database" });
      }

      if (!row) {
        // User with the specified email not found
        return res.status(404).json({ error: "User not found" });
      }

      // User found, respond with the user data
      const userInfo = {
        firstname: row.firstname,
        lastname: row.lastname,
        nickname: row.nickname,
        sex: row.sex,
        telnumber: row.telnumber,
        birthdate: row.birthdate,
        national: row.national,
        area: row.area,
        degree: row.degree,
        workexp: row.workexp,
        thailevel: row.thailevel,
        englevel: row.englevel,
        vehicle: row.vehicle,
        talent: row.talent,
        email: row.email,
        // Assuming "img" column stores the binary data of the user's image
        img: row.img, 
      };

      res.json(userInfo);
    }
  );
});

app.get("/getShopinfo/:email", (req, res) => {
  const email = req.params.email;

  // Perform the database query to fetch user data based on the email
  db.get(
    "SELECT * FROM shops WHERE email = ?",
    [email],
    (err, row) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Error querying database" });
      }

      if (!row) {
        // User with the specified email not found
        return res.status(404).json({ error: "User not found" });
      }

      // User found, respond with the user data
      const shopInfo = {
        firstname: row.firstname,
        lastname: row.lastname,
        shopname: row.shopname,
        location: row.location,
        timework: row.timework,
        money: row.money,
        lat: row.lat,
        long: row.long,
        welfare: row.welfare,
        email: row.email,
        telnumber: row.telnumber,
        // Assuming "img" column stores the binary data of the user's image
        img: row.img, 
      };

      res.json(shopInfo);
    }
  );
});







app.post("/validatePassword", (req, res) => {
  const { email, password } = req.body;
  db.all(
    `select * from users where email = '${email}' and password = '${password}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.send({
          validation: true,
          role: rows[0].loginrole,
          newuser: rows[0].newuser,
        });
      } else {
        res.send({ validation: false });
      }
    }
  );
});

app.post("/validatePasswordShop", (req, res) => {
  const { email, password } = req.body;
  db.all(
    `select * from shops where email = '${email}' and password = '${password}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.send({
          validation: true,
          role: rows[0].role,
          newuser: rows[0].newuser,
        });
      } else {
        res.send({ validation: false });
      }
    }
  );
});


app.post("/insertUser", (req, res) => {
  const { email, password, firstname, lastname, telnumber, occupation } =
    req.body;

  db.run(
    `INSERT INTO users (email, password, firstname,lastname,telnumber,occupation,nickname,sex,birthdate,national,area,degree,workexp,thailevel,englevel,vehicle,talent,img,loginrole,newuser) VALUES ('${email}', '${password}', '${firstname}','${lastname}','${telnumber}','${occupation}',null,null,null,null,null,null,null,null,null,null,null,null,'user','new')`,
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "User inserted successfully!" });
    }
  );
});

app.post("/insertShop", (req, res) => {
  const { email, password, firstname, lastname, telnumber, shop } =
    req.body;

  db.run(
    `INSERT INTO shops (email, password, firstname,lastname,telnumber,shopname,role,location,timework,money,lat,long,personamount,welfare,img,newuser) VALUES ('${email}', '${password}', '${firstname}','${lastname}','${telnumber}','${shop}','shop',null,null,null,null,null,null,null,null,'new')`,
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "User inserted successfully!" });
    }
  );
});

app.listen(3001, () => console.log("Listening on port 3001"));
