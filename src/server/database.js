const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://esparta:toddy1506@cluster0.pflcx.mongodb.net/cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose;
