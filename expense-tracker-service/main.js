const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

const fs = require('fs')

app.use(cors());
app.use(express.json());


const content = fs.readFileSync("categories.json", "utf-8");
let categories = JSON.parse(content);

//LIST
app.get('/categories', (req, res) => {
    res.json(categories);
});

app.get('/categories', (req, res) => {
    const { id } = req.params;
    const category = categories.find(cat.id === id);
    res.json(categories);
});

//CREATE
app.post('/categories', (req, res) => {
    const { name } = req.body;
    console.log(req.body)
    categories.push({ id: new Date().toISOString(), name: name });
    fs.writeFileSync('categories.json', JSON.stringify(categories));
    res.json(["succes"])
});

//UPDATE
app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const index = categories.findIndex((cat) => cat.id === id);
    fs.writeFileSync('categories.json', JSON.stringify(categories));
    res.json(["succes"])
});

//DELETE
app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    categories = categories.filter((cat) => cat.id !== id);
    fs.writeFileSync('categories.json', JSON.stringify(categories));
    res.json(["succes"])
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
