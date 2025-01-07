import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
console.log("connecting to ", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.err("connection failed ", err.message);
  });

const entryScheme = new mongoose.Schema({
  name: String,
  number: String,
});

entryScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Entry = mongoose.model("Entry", entryScheme);
export default Entry;
