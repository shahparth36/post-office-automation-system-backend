require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");
const authRoutes = require("./routes/auth.routes");
const packageRoutes = require("./routes/package.routes");
const serviceRoutes = require("./routes/service.routes");
const userRoutes = require("./routes/user.routes");

const { handleError } = require("./middleware/handleError");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", packageRoutes, serviceRoutes, userRoutes);
app.use("/api/auth", authRoutes);

app.use(handleError);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening at ${process.env.PORT}`)
);
