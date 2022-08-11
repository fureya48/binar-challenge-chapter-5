import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const user = {
  username: "admin",
  password: "admin123",
};

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/home", (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    if (username == user.username && password == user.password) {
      res.render("home");
    } else {
      res.send("Email/Password anda salah!");
    }
  });

app.get("/game", (req, res) => {
  res.render("game");
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
