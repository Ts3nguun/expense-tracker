const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/articles', (req, res) => {    
    res.json([
        { id: 1, title: "hi" },
        { id: 2, title: "bye" },
    ]);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})