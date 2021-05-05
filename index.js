// mongo
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => console.error(err));

//  express app
const express = require("express");
const redis = require("redis");
const session = require("express-session");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
// connect to redis
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

// app startup
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
