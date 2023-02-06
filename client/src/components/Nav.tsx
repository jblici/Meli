import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
