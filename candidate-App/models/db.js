const mongoose = require("mongoose");

// Allow Promises
mongoose.Promise = global.Promise;

// Connection
mongoose.connect(
  "mongodb+srv://shubh123:shubh123@shubh.qha2g.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// Validation
mongoose.connection
  .once("open", () => console.log("Connected to the database!"))
  .on("error", (err) => console.log("Error with the database!", err));
