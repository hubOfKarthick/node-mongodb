// express js
const express = require("express");
const app = express();

// cors
const cors = require("cors");

// const corsOptions = {
//   origin: "http:localhost:27017",
// };
const corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodb = require('./app/models');
mongodb.mongoose.connect(mongodb.url, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then((data) => {
  console.log('Connected to database!');
}).catch((err) => {
  console.error(err, 'Cant connect to database!');
  process.exit();
});

// node connection
app.get("/", (req, res) => {
  // console.log(req);
  res.json({ message: "Welcome to NODE!" });
});

require('./app/routes/app.routes.js')(app);
// port configuration
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at port:  http://localhost:${port}`);
});

