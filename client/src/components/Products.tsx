import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Card from "./Card";
import Breadcrumble from "./Breadcrumble";

// Definimos la interfaz para los items que recibimos de la api.
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
  // Usamos `useState` para inicializar el estado del item y las categorias.
  const [items, setItems] = useState<Array<Items>>([]);
  const [categories, setCategories] = useState<Array<string>>([]);

  // Usamos `useEffect` para llamar a la api y obtener la informacion de los items y sus categorias gracias a la query que sacamos de la URL cuando el componente se renderiza, monta.
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
          { //utilizamos la funcion map para renderizar los items que nos provee la api con el componente Card.
            items.map(item => {
              return (
                <Card info={item} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Cards
