"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [articles , setArticle] = useState([]);

  useEffect(() =>{
    fetch("http://localhost:4000/articles")
    .then(res => res.json())
    .then(data =>{
      setArticle(data)
    });
  },[]);

  return (
    <main>
      {articles.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </main>
  );
}
