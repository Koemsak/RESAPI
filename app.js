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
    const inputField = req.body;
    console.log(`Request data from partner: ${JSON.stringify(inputField)}`);
    try {
        const contents = inputField.contents;
        const password = "73785ff0d5cb651ca551a3d3820a2e9c";
        const iv = Buffer.from(password.substring(0, 16), 'utf-8');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(password, 'utf-8'), iv);
        let decrypted = decipher.update(Buffer.from(contents, 'base64'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        console.log(`Decrypted data: ${decrypted.toString('utf8')}`);
        return res.status(200).json({ status: 200, message: "Successfully", data: JSON.parse(decrypted.toString('utf8')) });
    } catch (error) {
        return res.status(400).json({ status: 400, message: "Invalid contents data.", data: null });
    }

})

// get use to view
// post use to crete
// put use to update
// delete use to delete or remove