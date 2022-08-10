import express from "express";
const app = express();

const user = {
  username: "admin",
  password: "admin123",
};

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

app.post("/login", (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  if (username == user.username && password == user.password) {
    res.render("home");
  } else {
    res.send("Email/Password anda salah!");
  }
});

app.get("/login/game", (req, res) =>{
  res.render("game");
})

app.get("/logout", (req, res) =>{
  res.redirect("/login")
})

app.use('/', (req, res) =>{
  res.status(404).send("Not Found")
})

app.listen(3001, () => {
  console.log("Server connected at 3001!");
});
