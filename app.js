require("./src/config/index.js");
require("./src/config/db.js");


const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const path = require('path')


// all routes
const router = require("./src/routes/index.js");

// bult in middlewares
const logger = require("./src/middlewares/logger.js");
const rateLimit = require("./src/middlewares/rate-limit.js");
const errorHandler = require("./src/middlewares/error-handler.js");
// const authenticateToken = require('./src/middlewares/authMiddleware.js');

const app = express();

// testing server
app.get("/", (req, res) => res.send("premium pay"));

// PORT
const PORT = process.env.PORT || 8090;

// middlewares
app.use(morgan("dev"), cors(),rateLimit(), express.json());

// auth for APIs
// app.use(authenticateToken);

// all routes
app.use(router);

app.use(helmet());

// error handling
app.use(errorHandler);
app.use(logger);
 

// static 
app.use('/static', express.static(path.join(__dirname, 'public')));

// starting server
app.listen(PORT, () => console.log(`server ready on port:${PORT}`));
