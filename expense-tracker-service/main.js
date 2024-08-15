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
app.get('/categories/list', (req, res) => {
    res.json(categories);
});

//CREATE
app.post('/categories/create', (req, res) => {
    const {name} = req.body;
    console.log(req.body)
    categories.push({ id: new Date().toISOString(), name: name });
    fs.writeFileSync('categories.json', JSON.stringify(categories) );
    res.json(["succes"])
});

//UPDATE
app.put('/categories/update', (req, res) => {
    const {id, name} = req.query;
    const index = categories.findIndex((cat) => cat.id === id);
    fs.writeFileSync('categories.json', JSON.stringify(categories) );
    res.json(["succes"])
});

//DELETE
app.delete('/categories/delete', (req, res) => {
    const {id} = req.query;
    categories = categories.filter((cat) => cat.id !== id);
    fs.writeFileSync('categories.json', JSON.stringify(categories) );
    res.json(["succes"])
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
