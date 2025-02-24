const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const { swaggerUi, swaggerSpec } = require("../config/swagger.js");
const prisma = require("../config/prisma");
const { Public } = require("@prisma/client/runtime/library");

//-------------------------Alternative to prisma-------------------------
// const connection = mysql.createConnection({
//   host: "database",
//   port: 3306,
//   user: "test",
//   password: "test",
//   database: "mydb",
// });
//-------------------------------------------------------------------

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

readdirSync("./src/routes").map((c) => app.use("/api", require("./routes/" + c)));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    console.log("Hello this is express");
});
app.listen(PORT, () => {
  console.log(`Server has been running on PORT ${PORT}`);
});

app.get('/feed', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  res.json(posts)
})

app.post('/post', async (req, res) => {
  const { title, content, authorEmail } = req.body
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(post)
})

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  })
  res.json(post)
})

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })
  res.json(user)
})

//--------------------mysql2 -------------------------
// app.get('/users', function (req, res, next) {
//   connection.query(
//     'SELECT * FROM `User`',
//     function(err, results, fields) {
//       res.json(results);
//     }
//   );
// })

// app.get('/users/:id', function (req, res, next) {
//   const id = req.params.id;
//   connection.query(
//     'SELECT * FROM `User` WHERE `id` = ?',
//     [id],
//     function(err, results) {
//       res.json(results);
//     }
//   );
// })
//------------------------------------------



// const users = [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
// ];

// const products = [
//   { id: 1, name: 'Laptop' },
//   { id: 2, name: 'Mouse' },
// ];

// app.get('/users', (req, res) => {
//   res.json(users);
// });

// app.get('/products', (req, res) => {
//   res.json(products);
// });






// const cantripMap = new Map();

// app.get("/", (req, res) => {
//     const entriesArray = Array.from(cantripMap, ([key, value]) => `${key}: ${value}`);
//     res.send("All Cantrips: " + entriesArray.join(', '));
// });

// app.post("/cantrip", (req, res) => {  
//     cantripMap.set(req.body.name,req.body.range);
//     res.send(req.body);
// });

// app.get("/entry/:name", (req, res) => {
//     let entryName = req.params.name;
//     if (cantripMap.has(entryName)) {
//         const value = cantripMap.get(entryName);
//         res.send(entryName + ":" + value); 
//       } else {
//         res.send("No entry found"); 
//       }
// });

// app.put("/update", (req, res) => {  
//     let toUpdate = cantripMap.get(req.body.name);
//     if(toUpdate) {
//         cantripMap.set(req.body.name, req.body.range);
//         res.send('Updated: ' + req.body.name)
//     } else {
//         res.send('Cantrip not found');
//     }
// });

// app.delete('/delete', function (req, res) {
//     let toDelete = cantripMap.get(req.query.name);
//     if(toDelete) {
//         cantripMap.delete(req.query.name);
//         res.send('Deleted: ' + req.query.name)
//     } else {
//         res.send('Cantrip not found');
//     }
//   });