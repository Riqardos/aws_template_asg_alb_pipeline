const express = require("express");
const os = require("os");

const app = express();
const port = 88;




const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

server.keepAliveTimeout = 61 * 1000;
server.headersTimeout = 65 * 1000;

app.get("/kill", (req, res) => {
  res.send({
    message: `Host ${os.hostname()} is shuting down!`,
    uptime: dhm(process.uptime() * 1000),
  });
  res.status(404)
  server.close()
});

app.get("/api", (req, res) => {
  res.send({
    hostname: os.hostname(),
    uptime: dhm(process.uptime() * 1000),
  });
  res.status(200)
});

app.get("/fibo", (req, res) => {
  let num = parseInt(req.query["number"]);
  if (num) {
    res.send({
      fibo: `${fibo(num)}`,
    });
    res.status(200)
  }
  else {
    res.status(406)
    res.send({
      message: `Bad number parameter`,
    });

  }
});

app.get("/", (req, res) => {
  res.send({
    hostname: os.hostname(),
    uptime: dhm(process.uptime() * 1000),
  });
  res.status(200)
});

function fibo(n) {

  if (n < 2)
    return 1;
  else return fibo(n - 2) + fibo(n - 1);
}


app.use("/healthcheck", require("express-healthcheck")());

app.use(express.static("public"));

function dhm(ms) {
  days = Math.floor(ms / (24 * 60 * 60 * 1000));
  daysms = ms % (24 * 60 * 60 * 1000);
  hours = Math.floor((daysms) / (60 * 60 * 1000));
  hoursms = ms % (60 * 60 * 1000);
  minutes = Math.floor((hoursms) / (60 * 1000));
  minutesms = ms % (60 * 1000);
  sec = Math.floor((minutesms) / (1000));
  return days + "d:" + hours + "h:" + minutes + "m:" + sec + "s";
}

