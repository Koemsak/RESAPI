const express = require("express");
const app = express();
const crypto = require("crypto");

app.listen(process.env.PORT || 5000, () => console.log("Server is runing....."));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.send("Node JS"));

let users = [
    { id: 1, name: "Koemsak", password: "334" },
    { id: 2, name: "Vuthy", password: "334" },
    { id: 3, name: "Somoun", password: "334" },
    { id: 4, name: "Thuon", password: "334" }
]

app.get("/api/users", (req, res) => res.send(users));

app.get("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index >= 0) {
        let user = users[index];
        res.send([user])
    } else {
        res.status(404)
        res.send({ error: "User id not found" });
    }

});

app.post("/api/users", (req, res) => {
    if (!req.body.password) {
        res.status(404)
        res.send({ error: "Password require" });
    };
    let user = {
        id: users.length + 1,
        name: req.body.name,
        password: req.body.password
    }
    users.push(user);
    res.send(users);
    console.log(user);
});

app.put("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let userName = req.body.name;
    let pass = req.body.password;
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index >= 0) {
        let user = users[index];
        user.name = userName;
        user.password = pass;
        res.send(user);
    } else {
        res.status(404)
        res.send({ error: "User id not found" });
    }
});

app.delete("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index >= 0) {
        users.splice(index, 1);
        res.send("Message delete successfully");
    } else {
        res.status(404)
        res.send({ error: "User id not found" });
    }
})

app.post("/api/callback", (req, res) => {
    console.log(req.body);
    return res.status(200).json({ status: 200, message: "Successfully", data: req.body.contents });
})

// get use to view
// post use to crete
// put use to update
// delete use to delete or remove