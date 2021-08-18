const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./Routes/users");
const authRoute = require("./Routes/auth");

dotenv.config();
const uri = "mongodb+srv://vipul:<vipul>@cluster0.uc9g7.mongodb.net/chatapp?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to mongodb")
});

mongoose.connection
    .once('open', () => {console.log('Connected')})
    .on('error', (error) => {
        console.log("Your Error :" + error);
    })


// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);



app.get("/", (req, res) => {
    res.send("Welcome to homepage")
})


app.listen(8080, () => {
    console.log("Backend server is running");
})