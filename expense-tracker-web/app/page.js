"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadList() {
    const name = await fetch("http://localhost:4000/categories")
    const data = await name.json()
    setCategories(data)
      }
  

  useEffect(() => {
    loadList();
  }, []);

  function Delete(id) {
    fetch(`http://localhost:4000/categories/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 404) {
        alert("Category not found");
      }
      loadList();
    });
  }

  function Update(oldName ,id) {
    const newName = prompt ("insert name ", oldName);
    fetch(`http://localhost:4000/categories/${id}`, {
      method: "put",
      body: JSON.stringify({ name: newName }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((res) => {
      if (res.status === 404) {
        alert("Category not found");
      }
      loadList();
    });
  }

  async function createNew() {
    const inputName = prompt("Name");
    
    const name = await fetch(`http://localhost:4000/categories`, {
      method: "POST",
      body: JSON.stringify({ name: inputName }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(() => {
        loadList();
      });
  }

  console.log({ categories })
  return (
    <main>
      <div>
        <button onClick={createNew} className="btn">Add new</button>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="flex gap-5 ">
          <div >{category.name}</div>
          <button onClick={() => Update(category.name)}>update</button>
          <button onClick={() => Delete(category.id)}>delete</button>
        </div>
      ))}
    </main>
  );
}
