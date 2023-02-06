import React from "react";
import { Link } from "react-router-dom";
import { parsePrice } from "../utils/parsePrice";
import { AiOutlineHeart } from "react-icons/ai";

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

interface Props {
  info: Items
}

const Card: React.FC<Props> = ({ info }) => {
  if (info) {
    return (
      <Link className="cardLink" to={`/items/${info?.id}`}>
        <div className="card">
          <div className="cardImg">
            <img src={info?.pictures} alt={info?.title} />
          </div>
          <div className="cardInfo">
            <div className="cardDescription">
              <div className="cardDetail">
                <span>{info?.title}</span>
              </div>
              <p className="price">
                <span>{info?.price.currency === "ARS" ? "$ " : "U$D "}</span>
                <span>{info ? parsePrice(info.price.amount) : null}</span>
              </p>
              <span className="shipping"><strong>{info?.free_sheeping === true ? 'Envio gratis' : 'No incluye envio'}</strong></span>
              <div className="cardCondition">
                {info?.condition === "new" ? "Nuevo" : "Reacondicionado"}
              </div>
            </div>
          </div>
          <div className="cardFavorite">
            <AiOutlineHeart/>
          </div>
        </div>
      </Link>
    );
  } else {
    return null
  }

}

export default Card