
const port = 4000
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports = {
    app,
};