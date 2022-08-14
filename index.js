import express from "express";
import hash from "object-hash";
import users from "./data/users.json" assert { type: "json" };
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let findUser;
let message;

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.status(200);
  res.render("login", {
    message
  });
});

app.post("/login", (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  findUser = users.find((user) => {
    return username == user.username && password == user.password;
  });
  if (findUser) {
    res.status(302);
    res.redirect("/home");
  } else {
    res.render("login", {
      message: "Username or password is wrong!",
    });
  }
  return findUser;
});

app.use((req, res, next) => {
  findUser.username;
  findUser.password;
  next();
});

app.get("/home", (req, res) => {
  res.status(200);
  res.render("home", {
    findUser
  });
});

app.get("/home/api", (req, res)=>{
  res.status(200)
  res.json({
    username: findUser.username,
    password: hash(findUser.password)
  });
})

app.get("/game/:username", (req, res) => {
  res.status(200);
  res.render("game", {
    findUser
  });
});

app.get("/logout", (req, res) => {
  res.status(302);
  res.redirect("/login");
});

app.use("/", (req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(3001, () => {
  console.log("Server connected at 3001!");
});
