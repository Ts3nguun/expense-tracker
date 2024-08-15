"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);

  function loadList() {
    fetch("http://localhost:4000/categories/list")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      });
  }

  function Delete() { 
    fetch(`http://localhost:4000/categories/delete?id=${id}`,{
      method:"DELETE",
    })
    .then((res) => res.json())
    .then(data => {
      
    });
  }

  useEffect(() => {
    loadList
  }, []);


  function createNew() {
    const name = prompt("Name");

    fetch(`http://localhost:4000/categories/create`,{
      method: "POST",
      body: JSON.stringify({name: name}),
      headers:{
        "Content-type":"application/json; charset=UTF-8",
      }
    })

      .then((res) => res.json())
      .then(data => {
        loadList();
      });
  }
  return (
    <main>
      <button onClick={createNew} className="btn">Add new</button>
      {categories.map((category) => (
        <div className="flex gap-5">
          <div key={category.name}>{category.name}</div>
          {/* <button onClick={edit}>edit</button> */}
          <button onClick={Delete}>delete</button>
        </div>
      ))}

    </main>
  );
}
