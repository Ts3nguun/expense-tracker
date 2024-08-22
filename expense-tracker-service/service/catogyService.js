const fs = require('fs')




async function createNewCategory(form) {
    const id = uuidv4();
    form.id = id;
    categories.push(form);
    fs.writeFileSync("data/categories.json", JSON.stringify(categories));
    return id;
}

function getCategories() {}
function getOneCategory(id) {}
function updateCategory(id, update ) {}
function deleteCategory(id) {}