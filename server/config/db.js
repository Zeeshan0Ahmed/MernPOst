const mongoose = require("mongoose");

const connectToMongo = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://admin:Allahisgreatest@cluster0.vo5mezc.mongodb.net/MernPostApp?retryWrites=true&w=majority&appName=Cluster0"
  );
  if (res) {
    console.log("Database is connected");
  }
};
module.exports = connectToMongo;
