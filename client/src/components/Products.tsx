import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Card from "./Card";
import Breadcrumble from "./Breadcrumble";

interface Items {
  id: string
  pictures: string
  title: string
  price: {
    currency: string
    amount: number
    decimals: number
  }
  condition: string
  free_sheeping: boolean
}

const Cards: React.FC = () => {
  const [items, setItems] = useState<Array<Items>>([]);
  const [categories, setCategories] = useState<Array<string>>([]);

  useEffect(() => {
    let search = window.location.search.split("=")[1];
    try {
      fetch(`http://localhost:3001/api/items?query=${search}`)
        .then((response) => response.json())
        .then((res) => {
          setItems(res.items);
          setCategories(res.categories);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Nav />
      <div className="container">
        <Breadcrumble categories={categories} />
        <div className="products">
          <Card info={items[0]} />
          <Card info={items[1]} />
          <Card info={items[2]} />
          <Card info={items[3]} />
        </div>
      </div>
    </div>
  );
}

export default Cards
