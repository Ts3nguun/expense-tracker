const {startApp} = require('./configs/basic')
const fs = require('fs')

const content = fs.readFileSync("data/categories.json", "utf-8");
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
    fs.writeFileSync('data/categories.json', JSON.stringify(categories));
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
fs.writeFileSync('data/categories.json', JSON.stringify(categories));
res.sendStatus(204);
});


