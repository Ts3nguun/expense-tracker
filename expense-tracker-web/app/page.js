"use client"


import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


import { useEffect, useState } from "react";
import { House } from "lucide-react"

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
      <Button variant="outline" onClick={() => setOpen(true)}>---add new---</Button>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              close
            </Button>
          </DialogHeader>
          <div className="py-4 gap-5 flex">

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline"><House /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                <House/>
                </div>
              </PopoverContent>
            </Popover>
            <div>
              <Input
                id="username"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" type="submit" className="bg-green-600 w-full rounded-full hover:bg-green-800">Add</Button>
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
