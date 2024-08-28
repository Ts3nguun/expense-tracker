"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);

  function loadList() {
    fetch("http://localhost:4000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      });
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

  // function Update(id) {
  //   fetch(`http://localhost:4000/categories/${id}`, {
  //     method: "put",
  //   }).then((res) => {
  //     if (res.status === 404) {
  //       alert("Category not found");
  //     }
  //     loadList();
  //   });
  // }

  function createNew() {
    const name = prompt("Name");
    fetch(`http://localhost:4000/categories`, {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(() => {
        loadList();
      });
  }

  console.log({categories})
  return (
    <main>
      <div>
        <button onClick={createNew} className="btn">Add new</button>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="flex gap-5 ">
          <div >{category.name}</div>
          <button onClick={() => Update(category.id)}>update</button>
          <button onClick={() => Delete(category.id)}>delete</button>
        </div>
      ))}
    </main>
  );
}
