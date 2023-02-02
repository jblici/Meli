import React from "react";
import { Link } from "react-router-dom";

export default function Card({ info }) {
  const parsePrice = (num) => {
    let price = num.toString();
    let finalNum = [];
    for (let i = price.length; i >= 0; i--) {
      if (finalNum.length === 3) finalNum.unshift(".");
      else if (
        finalNum.length > 3 &&
        finalNum.join("").split(".")[0].length === 3
      )
        finalNum.unshift(".");
      finalNum.unshift(price.slice(-1));
      price = price.substring(0, price.length - 1);
    }
    if (finalNum.join("")[0] === ".") return finalNum.join("").slice(1);
    return finalNum.join("");
  };

  if (info) {
    return (
      <Link className="cardLink" to={`/items/${info.id}`}>
        <div className="card">
          <div className="cardImg">
            <img src={info.picture} alt="foto-producto" />
          </div>
          <div className="cardInfo">
            <div className="cardDescription">
              <p>
                <span>{info.price.currency === "ARS" ? "$ " : "U$D "}</span>
                <span>{parsePrice(info.price.amount)}</span>
              </p>
              <div className="cardDetail">
                <span>{info.title}</span>
                <span>Bla bla bla</span>
              </div>
            </div>
            <div className="cardShipping">
              {info.condition === "new" ? "Nuevo" : "Usado"}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
