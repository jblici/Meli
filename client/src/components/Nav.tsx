import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  // Inicializamos el estado con un string vacio
  const [search, setSearch] = useState("");
  // Usamos la funcion de navegacion de react-router-dom para redireccionar a la vista de los productos
  const navigate = useNavigate();

  // Creamos la funcion que se llama cuando el formulario es ejecutado
  const handleSearch = (e: React.FormEvent) => {
    // Con el preventDefault() cancelamos el evento, lo que significa que cualquier acción por defecto que deba producirse como resultado de este evento, no ocurrirá
    e.preventDefault();
    // Con la funcion navigate() nos redirigimos a la ruta "/items" con la query search que obtenemos del input search en la URL
    navigate(`/items?query=${search}`, { replace: true });
  };

  return (
    <nav className="nav">
      <div className="brand">
        <img
          className="logo"
          src="https://comunidadblogger.net/wp-content/uploads/2020/10/mercado-libre-logo.jpeg"
          alt="mercadolibre-logo"
        />
      </div>
      <div className="">
        <form className="searchbar" method="search" onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            // Actualizamos el estado search cada vez que el input search cambie.
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nunca dejes de buscar"
          />
          <div>
            <BsSearch type="submit" className="searchIcon" />
          </div>
        </form>
      </div>
    </nav>
  );
}
