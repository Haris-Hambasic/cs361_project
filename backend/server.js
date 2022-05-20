const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3501;

const star_wars_application_server = express();

star_wars_application_server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
