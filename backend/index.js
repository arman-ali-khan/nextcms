const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const passwordHash = require("password-hash");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());

// Middleware
app.use(bodyParser.json());



// MySQL connection
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

// CRUD operations

// Create Main Users
app.post("/api/users", (req, res) => {
  const user = req.body;
  console.log(req.body);

  connection.query("INSERT INTO users SET ?", user, (error, results) => {
    if (error) throw error;
    if (results) {
      connection.query(
        "INSERT INTO sites SET ?",
        { uid: user.uid, date: user.createdAt, name: "" },
        (error, siteResult) => {
          if (error) throw error;
          res.json(results);
        }
      );
    }
  });
});



// Create Site Users
app.post("/api/siteUsers", (req, res) => {
  const user = req.body;

  const email = user.email;
  connection.query(
    `SELECT * FROM siteusers WHERE email = ${JSON.stringify(email)}`,
    (error, results) => {
      if (error) throw error;
      console.log(results);
      const result = results[0];
      if (result) {
        res.status(409).send({ message: "Already Use This Email" });
      } else {
        connection.query(
          "INSERT INTO siteusers SET ?",
          user,
          (error, results) => {
            if (error) throw error;
            res.json(results);
          }
        );
      }
    }
  );
});

// Read user by email
app.get("/api/siteuser", (req, res) => {
  const email = req.query.email;
  connection.query(
    `SELECT * FROM siteusers WHERE email = ${JSON.stringify(email)}`,
    (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    }
  );
});

// site user login

app.get("/api/loginuser", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  console.log(req.query);
  connection.query(
    `SELECT * FROM siteusers WHERE email = ${JSON.stringify(email)}`,
    (error, results) => {
      if (error) throw error;
      const result = results[0];
      if (result) {
        const dbPassword = result.password;
        const decodedPassword = passwordHash.verify(password, dbPassword);
        if (decodedPassword) {
          return res.send(results[0]);
        } else {
          return res.status(401).send({ message: "Wrong Password" });
        }
      } else {
        return res.status(404).send({ message: "Email Not Found" });
      }
    }
  );
});

// Read site uid
app.get("/api/site", (req, res) => {
  const id = req.query.uid;
  console.log(id)
  connection.query(
    `SELECT * FROM sites WHERE uid = ${JSON.stringify(id)}`,
    (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    }
  );
});

// ===========================
// POST
// create site post
app.post("/api/posts", (req, res) => {
    const post = req.body
    const siteId = req.body.siteId;
    connection.query(`SELECT * FROM sites WHERE uid = ${JSON.stringify(siteId)}`,
      (error, results) => {
        if (error) throw error;
       if(results.length){
          connection.query("INSERT INTO sitePosts SET ?", post, (error, results) => {
              if (error) throw error;
              if (results) {
                res.send(results);
              } else {
                return res.status(401).send({ message: "Error While Posting" });
              }
          });
      }else{
           return res.status(401).send({ message: "Site ID Not Found" });
       }
      }
    );
   
  });

  //===============



//   =====================
// get all posts
app.get("/api/posts", (req, res) => {
    let limit = parseInt(req.query.limit) || 100; // number of records per page
    let offset = (parseInt(req.query.page) - 1) * limit || 0; // start index
    let sort = req.query.sort  || 'DESC'; // Sort by Descri
    const siteId = req.query.id 
    connection.query(
      `SELECT * FROM sitePosts  WHERE siteId = ${JSON.stringify(siteId)} AND publish = 1 AND aproved = 1  ORDER BY date ${sort} LIMIT ${limit} OFFSET ${offset} `,
      (error, results) => {
        if (error) throw error;
        res.json(results);
      }
    );
  });

  // get post by id 
  app.get('/api/post',(req,res)=>{
    const postId = req.query.postId // get post id
    const siteId = req.query.id // get site id
    connection.query(
        `SELECT * FROM sitePosts WHERE siteId = ${JSON.stringify(siteId)} AND id = ${JSON.stringify(postId)} AND publish = 1 AND aproved = 1 `,
        (error, results) => {
          if (error) throw error;
          let sql = `UPDATE sitePosts SET ? WHERE id = ${postId}`;
        let query = connection.query(
          sql,
          { view: parseInt(results[0].view) + 1 },
          (err, update) => {
            if (err) throw err;
            res.json(results[0]);
          }
        );
          
        }
      );
  })

  // get featured post
  app.get('/api/featured',(req,res)=>{
    const siteId = req.query.id // find by id
    console.log(siteId)
    connection.query(`SELECT * FROM sitePosts WHERE siteId =  ${JSON.stringify(siteId)} AND featured = 1 AND publish = 1 AND aproved = 1`, 
    (error, results) => {
        if (error) throw error;
        res.json(results[0]);
      })
  })

  

  // get popular
  app.get("/api/popular", (req, res) => {
    const sort = req.query.sort || "DESC" // sort by desc
    const siteId = req.query.id 
    connection.query(
      `SELECT * FROM sitePosts WHERE siteId = ${JSON.stringify(siteId)} AND publish = 1 AND aproved = 1 AND createdAt >= NOW() - INTERVAL 7 DAY ORDER BY view ${sort}
      LIMIT 5 `,
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "An error occurred" });
          return;
        }
        res.send(results);
      }
    );
  });

// Update
// app.put("/items/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, description } = req.body;
//   connection.query(
//     "UPDATE items SET name = ?, description = ? WHERE id = ?",
//     [name, description, id],
//     (error) => {
//       if (error) throw error;
//       res.json({ message: "Updated successfully!" });
//     }
//   );
// });

// // Delete
// app.delete("/items/:id", (req, res) => {
//   const { id } = req.params;
//   connection.query("DELETE FROM items WHERE id = ?", [id], (error) => {
//     if (error) throw error;
//     res.json({ message: "Deleted successfully!" });
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;