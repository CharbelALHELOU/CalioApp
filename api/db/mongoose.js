// This file will handle connection logic to the MongoDB database

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://alelou:alelou@cluster0-shard-00-00.wtjf7.mongodb.net:27017,cluster0-shard-00-01.wtjf7.mongodb.net:27017,cluster0-shard-00-02.wtjf7.mongodb.net:27017/calio?ssl=true&replicaSet=atlas-9ll9xg-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB successfully :)");
  })
  .catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
  });

// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = {
  mongoose,
};
