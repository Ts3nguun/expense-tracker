const { app } = require('./configs/basic.js')
const { sql } = require('./configs/database.js')
const { createNewCategory, getCategories,} = require('./service/catogyService')

//LIST
app.get('/categories', async(req, res) => {
    const categories = await getCategories();
    res.json(categories);
});

//CREATE
app.post("/categories", async (req, res) => {
    const {name} = req.body;
    const id = await createNewCategory({name});
    res.status(201).json({ id })
});



app.get("/dbtest", async (req, res) => {
const result = await sql`select version()`;
console.log(result)
res.json({result});
});

// //DELETE
// app.delete('/categories/:id', async (req, res) => {
//     const { id } = req.params;
// // if (deleteIndex < 0) {
// //     res.sendStatus(404);
// //     return;
// // }
// await deleteCategory(id )
// res.sendStatus(204);
// });


