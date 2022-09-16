const { response } = require('express');
const express = require('express');
const app = express();
require("dotenv").config();
const port = 5001;
const cors = require("cors");
const bodyParser = require("body-parser");
const {notesrouter} = require("./api/v1/index");
require("./db");

app.use(bodyParser.json());

app.use(cors());


// root
app.get(`/`, (request,response)=>{
    response.send('hello world');
})


app.use("/notes",notesrouter);




app.listen(port, () => {
    console.log(`notes backend app running on port http://localhost:${port}`);
})