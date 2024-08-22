const {startApp} = require('./configs/basic')
const {createNewCategory, getCategories, getOneCategory, updateCategory, deleteCategory} = require('./service/catogyService')
const fs = require('fs')

const app = startApp


//LIST
app.get('/categories', (req, res) => {
    const categories = getCategories();
    res.json(categories);
});

app.get("/categories:id", (req, res) => {
    const { id } = req.params;
    const one = getOneCategory(id);
    res.json(one);
});

//CREATE
app.post("/categories", async (req, res) => {
    const { name } = req.body;
    const id = await createNewCategory ({name});
    res.status(201).json({id})
});

//UPDATE
app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message : "`Name` field is required"});
        return;
    }

    await updateCategory(id, {name});
    res.sendStatus(204);
});

//DELETE
app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;
if (deleteIndex < 0) {
    res.sendStatus(404);
    return;
}
await deleteCategory(id )
res.sendStatus(204);
});


