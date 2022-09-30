const express = require("express");
const error = require("./src/middleware/error");
const app = express();

const port = process.env.APP_PORT || 3000;

app.use(error);
app.use(express.json());

require("./src/routes/routes")(app);
require("./src/config/db.config")();
require("./src/config/validation.config")();

if(process.env.NODE_ENV === 'production')
    require("./src/config/prod.config")(app)

if(!process.env.JWT_SECRET) {
    console.error('ERROR: JWT_SECRET is not defined');
    process.exit(1);
}

app.listen(port, () => console.log(`Listening on port ${port}...`));