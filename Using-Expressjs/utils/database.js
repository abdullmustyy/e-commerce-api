import { MongoClient } from "mongodb";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://abdul:xLoR9GREjpZlXNA4@cluster0.rtdzvud.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db("Shop");
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

export { mongoConnect, getDb };
