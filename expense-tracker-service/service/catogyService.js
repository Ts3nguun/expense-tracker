const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { sql } = require('../configs/database');

async function createNewCategory({name}) {
    const id = uuidv4();
    await sql`insert into category(id, name) values (${id}, ${name})`;
    return id;
}

async function getCategories() {
    const list = await sql`select * from category`;
    return list;
}

// function getOneCategory(id) { 

// }

// function updateCategory(id, update) {
//     const index = categories.findIndex((cat) => cat.id === id);
//     categories[index].name = name;
//     fs.writeFileSync('data/categories.json', JSON.stringify(categories));
// }

// function deleteCategory(id) {
//     const deleteIndex = categories.findIndex((cat) => cat.id === id);
//     categories = categories.filter((cat) => cat.id !== id);
//     fs.writeFileSync('data/categories.json', JSON.stringify(categories));
// }


module.exports = {
    createNewCategory,
    getCategories,
};