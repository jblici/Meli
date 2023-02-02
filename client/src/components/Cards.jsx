import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Card from "./Card";

export default function Cards() {
  const [items, setItems] = useState({
    items: [],
    categories: [],
  });

  useEffect(() => {
    let search = window.location.search.split("=")[1];
    try {
      fetch(`http://localhost:3001/api/items?query=${search}`)
        .then((response) => response.json())
        .then((res) => {
          setItems(res);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Nav />
      {items.items ? (
        <div className="container">
          <div className="breadcrumble">
            <span>{items.categories.join(" > ")}</span>
          </div>
          <div className="products">
            <Card info={items.items[0]} />
            <Card info={items.items[1]} />
            <Card info={items.items[2]} />
            <Card info={items.items[3]} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
