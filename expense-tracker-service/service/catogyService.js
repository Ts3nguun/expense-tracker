const fs = require('fs')
const { v4: uuidv4 } = require('uuid');



async function createNewCategory(form) {
    const id = uuidv4();
    form.id = id;
    categories.push(form);
    fs.writeFileSync("data/categories.json", JSON.stringify(categories));
    return id;
}

function getCategories() {
    const content = fs.readFileSync("data/categories.json", "utf-8");
    const categories = JSON.parse(content);
    return categories;
}

function getOneCategory(id) { 
    
}

function updateCategory(id, update) {
    const index = categories.findIndex((cat) => cat.id === id);
    categories[index].name = name;
    fs.writeFileSync('data/categories.json', JSON.stringify(categories));
}

function deleteCategory(id) {
    const deleteIndex = categories.findIndex((cat) => cat.id === id);
    categories = categories.filter((cat) => cat.id !== id);
    fs.writeFileSync('data/categories.json', JSON.stringify(categories));
}


module.exports = {
    createNewCategory,
    getCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
};