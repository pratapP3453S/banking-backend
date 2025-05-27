const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const bankerRoutes = require("./routes/bankerRoutes");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["https://simplebankingapp.vercel.app/"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/banker", bankerRoutes);
app.use("/hello", bankerRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
  );
});
