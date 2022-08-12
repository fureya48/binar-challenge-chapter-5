import express from "express";
import users from "./data/users.json" assert {type: "json"}
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/home", (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const user = users.find((user) => user.username == username);
  if (username == user.username && password == user.password) {
    res.render("home", {
      user: user
    });
  } else {
    res.send("Email/Password anda salah!");
  }
});

app.use((req,res, next)=>{
  console.log("middleware............")
  return next()
})

app.get("/game/:user", (req, res) => {
  res.render("game");
});

app.get("/home/:user", (req, res) => {
  res.render("home");
});

app.get("/logout", (req, res) => {
  res.redirect("/login");
});

app.use("/", (req, res) => {
  res.status(404).send("<h1>Not Found</h1>");
});

app.listen(3001, () => {
  console.log("Server connected at 3001!");
});
