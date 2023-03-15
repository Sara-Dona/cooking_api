require("dotenv").config();
require("./config/database").connect();
const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

//const routes
const userRouter = require("./routes/userRoute");
const subscriberRoutes = require("./routes/subscriberRoute");
const courseRouter = require("./routes/courseRoute");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//api routes
app.use('/api/users', userRouter)
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/courses", courseRouter);

app.listen(port, () => console.log("listening on port " + port));
