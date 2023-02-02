import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

export default function CardDetails() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      console.log("entre");
      axios.get(`http://localhost:3001/api/items/${id}`).then((res) => {
        console.log(res);
        setItem(res.data.item);
        console.log(item);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Nav />
      {item.id ? (
        <div className="container">
          <div className="productCard">
            <div className="productDetail">
              <div className="productImg">
                <img src={item?.pictures} alt="" />
                <div className="productDescription">
                  <h1>Descripcion del producto</h1>
                  <p className="description">{item?.description}</p>
                </div>
              </div>
              <div className="productInfo">
                <p className="sells">
                  {item?.condition === "new" ? "Nuevo" : "Usado"}{" "}
                  <span>{`- ${item?.sold_quantity} vendidos`}</span>
                </p>
                <div className="info">
                  <strong>
                    <span>{item?.title}</span>
                  </strong>
                  <p className="price">
                    {`${item?.price.currency === "ARS" ? "$" : "U$D"} ${
                      item?.price.amount
                    }`}
                    <span className="cents">{item?.price.decimals === 0 ? '00' : item.price.decimals}</span>
                  </p>
                </div>
                <div className="productButton">
                  <button>Comprar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ):null}
    </div>
  );
}
