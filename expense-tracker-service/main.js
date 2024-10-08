const { app } = require('./configs/basic.js')
const { createNewCategory, getCategories, getOneCategory, deleteOneCategory, updateOneCategory, } = require('./service/catogyService')

//LIST
app.get("/categories", async (req, res) => {
    const categories = await getCategories();
    res.json(categories);
});

app.get("/categories/:id", async (req, res) => {
    const { id } = req.params;
    const one = await getOneCategory(id);
    if (!one) {
        res.status(404).json({ message: "Not found" })
        return;
    }
    res.json(one);
});

//CREATE
app.post("/categories", async (req, res) => {
    const newCategory = req.body;
    const id = await createNewCategory(newCategory)
    res.status(201).json({ id })
});

//DELETE
app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;
    await deleteOneCategory(id);
    res.sendStatus(204);
});

//UPDATE
app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const input = req.body;
    await updateOneCategory(id, input);
    res.sendStatus(204);
});