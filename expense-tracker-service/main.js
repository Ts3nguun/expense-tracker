const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

const fs = require('fs')

app.use(cors())

const content = fs.readFileSync("categories.json", "utf-8");
const categories = JSON.parse(content);

app.get('/categories/list', (req, res) => {
    res.json(categories);
});

app.get('/categories/create', (req, res) => {
    const {name} = req.query;
    const content ={categories}
    categories.push({ name: name });
    fs.writeFileSync('categories.json', JSON.stringify(categories) );
    res.json(["succes"])
});

// app.get('/categories/update', (req, res) => {
//     //todo
//     res.json(["succes"])
// });

// app.get('/categories/delete', (req, res) => {
//     //todo
//     res.json(["succes"])
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
//app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

// app.get('/articles', (req, res) => {    
//     res.json([
//         { id: 1, title: "hi" },
//         { id: 2, title: "bye" },
//     ]);
// });