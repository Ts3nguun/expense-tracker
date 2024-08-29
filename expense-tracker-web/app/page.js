"use client"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"



import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false)

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

  function Update(oldName, id) {
    const newName = prompt("insert name ", oldName);
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
      <button onClick={() => setOpen(true)}>---add new---</button>
      <Dialog open={true}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <button onClick={() => setOpen(false)}>
              close
            </button>
          </DialogHeader>
          <div className="py-4 gap-5">
            <div>
              <Input
                className="col-span-3"
              />
            </div>
            <div>
              <Input
                id="username"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>





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
