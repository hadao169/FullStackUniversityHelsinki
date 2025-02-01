import express from "express";
const app = express();

const requestTime = function (req, res, next) {
  req.requestTime2 = Date.now();
  console.log(req.requestTime2);
  next();
};
console.log(requestTime);

app.use(requestTime);

app.get("/", (req, res) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${req.requestTime2}</small>`;
  res.send(responseText);
});

app.listen(3000);
