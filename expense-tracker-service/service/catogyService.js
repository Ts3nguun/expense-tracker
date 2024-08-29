const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { sql } = require('../configs/database');

async function createNewCategory({name , color = 'blue' , icon = 'home'}) {
    const id = uuidv4();
    await sql`insert into category(id, name, color, icon) values (${id}, ${name}, ${color}, ${icon})`;
    return id;
}

async function getCategories() {
    const list = await sql`select * from category`;
    return list;
}

async function getOneCategory(id) { 
    const list = await sql `select * from category where id = ${id}`;
    if(list.length){
        return list[0]
    }
    return null;
}

async function deleteOneCategory(id) {
    await sql`delete from category where id = ${id}`;
}

async function updateOneCategory(id, {name, color, icon}) {
    await sql`update category set name = ${name}, color = ${color}, icon = ${icon},  where id = ${id}`;
}



module.exports = {
    createNewCategory,
    getCategories,
    getOneCategory,
    deleteOneCategory,
    updateOneCategory,
};