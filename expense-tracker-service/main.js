const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

const fs = require('fs')

app.use(cors());
app.use(express.json());


const content = fs.readFileSync("categories.json", "utf-8");
let categories = JSON.parse(content);


async function createNewCategory(form) {
    const id = uuidv4();
    form.id = id;
    categories.push(form);
    fs.writeFileSync("categories.json", JSON.stringify(categories));
    return id;
}


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
app.post('/categories', async (req, res) => {
    const { name } = req.body;
    const id = await createNewCategory ({name});
    res.status(201).json({id})
});

//UPDATE
app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message : "`Name` field is required"});
        return;
    }
    const index = categories.findIndex((cat) => cat.id === id);
    categories[index].name = name;
    fs.writeFileSync('categories.json', JSON.stringify(categories));
    res.json(["succes"])
});

//DELETE
app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const deleteIndex = categories.findIndex((cat) => cat.id === id);
if (deleteIndex < 0) {
    res.sendStatus(404);
    return;
}

categories = categories.filter((cat) => cat.id !== id);
fs.writeFileSync('categories.json', JSON.stringify(categories));
res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
