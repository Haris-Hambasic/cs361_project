const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3501;

const star_wars_application_server = express();

star_wars_application_server.use(cors());
star_wars_application_server.use(express.json());
star_wars_application_server.use(express.urlencoded({ extended: true }));
star_wars_application_server.use(bodyParser.json());
star_wars_application_server(bodyParser.urlencoded({ extended: true }));

star_wars_application_server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
