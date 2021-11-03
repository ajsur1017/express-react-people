///////////////////////////////////
// Dependencies
///////////////////////////////////
// dotenv to get our env variables
require("dotenv").config()
// PULL PORT variable from .env
const { PORT = 3000, MONGODB_URL } = process.env
// import express
const express = require("express")
// create app object
const app = express()
// import mongoose
const mongoose = require("mongoose")
// import middleware
const cors = require("cors") // cors headers
const morgan = require("morgan") // logging


//////////////////////////////////
// Database Connection
//////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// Connection Events
mongoose.connection
    .on("open", () => console.log("Connected to Mongo"))
    .on("close", () => console.log("Disonnected to Mongo"))
    .on("error", (error) => console.log(error))

/////////////////////////////////
// Models
/////////////////////////////////
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model("People", PeopleSchema)

/////////////////////////////////
// Middleware
/////////////////////////////////
app.use(cors()) // prevent cors errors
app.use(morgan("dev")) // logging
app.use(express.json()) // parse json bodies
///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
  });
  
  // PEOPLE INDEX ROUTE
  app.get("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE CREATE ROUTE
  app.post("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE UPDATE ROUTE
  app.put("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE DELETE ROUTE
  app.delete("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(await People.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  ///////////////////////////////
  // LISTENER
  ////////////////////////////////
  app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));