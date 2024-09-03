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
import { Check, Copy, House, HousePlus, IdCard, Image, Leaf, ListCheck, Mic, NotepadText, SearchX, SquareUserRound, TableProperties } from "lucide-react"


const categoryIcons = [
  {
    name: "home",
    Icon: House
  },
  {
    name: "SquareUser",
    Icon: SquareUserRound
  },
  {
    name: "hoIdCardme",
    Icon: IdCard
  },
  {
    name: "SquareUserRound",
    Icon: SquareUserRound
  }, {
    name: "Copy",
    Icon: Copy
  }, {
    name: "Image",
    Icon: Image
  },
  {
    name: "SearchX",
    Icon: SearchX
  },
  {
    name: "Mic",
    Icon: Mic
  },
  {
    name: "TableProperties",
    Icon: TableProperties
  },
  {
    name: "NotepadText",
    Icon: NotepadText
  }, {
    name: "ListCheck",
    Icon: ListCheck
  }, {
    name: "Leaf ",
    Icon: Leaf
  },
  // {
  //   name: "home",
  //   Icon: House
  // },
  // {
  //   name: "home",
  //   Icon: SquareUserRound
  // },
  // {
  //   name: "home",
  //   Icon: IdCard
  // },
  // {
  //   name: "home",
  //   Icon: SquareUserRound
  // },{
  //   name: "home",
  //   Icon: SquareUserRound
  // },{
  //   name: "home",
  //   Icon: SquareUserRound
  // },
  // {
  //   name: "home",
  //   Icon: House
  // },
  // {
  //   name: "home",
  //   Icon: SquareUserRound
  // },
  // {
  //   name: "home",
  //   Icon: IdCard
  // },
  // {
  //   name: "home",
  //   Icon: SquareUserRound
  // },{
  //   name: "home",
  //   Icon: SquareUserRound
  // },{
  //   name: "home",
  //   Icon: SquareUserRound
  // },
  // {
  //   name: "home",
  //   Icon: House
  // },
  // {
  //   name: "home",
  //   Icon: SquareUserRound
  // },
  // {
  //   name: "home",
  //   Icon: IdCard
  // },
  // {
  //   name: "home",
  //   Icon: SquareUserRound
  // },{
  //   name: "home",
  //   Icon: SquareUserRound
  // },{
  //   name: "home",
  //   Icon: SquareUserRound
  // },
]

const categoryColors = [
  {
    name: 'blue',
    value: "#0166FF"
  },
  {
    name: 'sky',
    value: "#01B3FF"
  },
  {
    name: 'green',
    value: "#41CC00"
  },
  {
    name: 'yellow',
    value: "#F9D100"
  },
  {
    name: 'orange',
    value: "#FF7B01"
  },
  {
    name: 'purple',
    value: "#AE01FF"
  },
  {
    name: 'red',
    value: "#FF0101"
  },
]

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("")

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
    const name = await fetch(`http://localhost:4000/categories`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        color: color,
        icon: icon,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(() => {
        loadList();
      });
  }

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
                <Button variant="outline"><HousePlus /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="gap-10  ">
                  <div className="grid grid-cols-6 gap-4">
                    {categoryIcons.map(({ name, Icon }) => (
                      <div key={name} onClick={() => setIcon(name)} className={`${icon === name ? "bg-blue-200 w-6 h-6" : ""}`}>
                        <Icon />

                      </div>
                    ))}
                  </div>
                  <div className="border-b-2 border-gray-300 "></div>
                  <div className="grid grid-cols-7">
                    {categoryColors.map(({ name, value }) => (
                      <div key={name} onClick={() => setColor(name)} className={`w-8 h-8 rounded-full text-white flex justify-center items-center`} style={{ backgroundColor: value }}>
                        {color === name && <Check className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>
                </div>                
              </PopoverContent>
            </Popover>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="col-span-3"/>
            <div>

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
          <div >
            {category.name}
            {category.Ic}
          </div>
          <button onClick={() => Update(category.name)}>update</button>
          <button onClick={() => Delete(category.id)}>delete</button>
        </div>
      ))}
    </main>
  );
}
