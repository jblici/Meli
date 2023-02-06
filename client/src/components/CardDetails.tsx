import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Breadcrumble from "./Breadcrumble";
import { parsePrice } from "../utils/parsePrice";
import { Helmet } from "react-helmet";
import axios from 'axios';

interface Item {
  id: string
  title: string
  price: {
    currency: string
    amount: number
    decimals: number
  },
  pictures: string
  condition: string
  free_shipping: boolean
  sold_quantity: number
  description: string
}

interface AppState {
  category: Array<string>
  item: Item
}

const CardDetails: React.FC = () => {
  const [data, setData] = useState<AppState["item"]>();
  const [categories, setCategories] = useState<AppState["category"]>([]);
  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/api/items/${id}`).then((res) => {
        setData(res.data.item);
        setCategories(res.data.categories)
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Nav />
      {data ? (
        <div className="container">
          <Breadcrumble categories={categories} />
          <Helmet>
            <title>{data.title}</title>
            <meta name="description" content={data.title} />
          </Helmet>
          <div className="productCard">
            <div className="productDetail">
              <div className="productLeft">
                <div className="leftInformation">
                  <img src={data.pictures} alt={data.title} />
                  <div className="productDescription">
                    <h1>Descripcion del producto</h1>
                    <p className="description">{data.description}</p>
                  </div>
                </div>
              </div>
              <div className="productInfo">
                <p className="sells">
                  {data.condition === "new" ? "Nuevo" : "Usado"}{" "}
                  <span>{data.sold_quantity > 0 ? `| ${data.sold_quantity} vendidos` : null}</span>
                </p>
                <div className="info">
                  <strong>
                    <span>{data.title}</span>
                  </strong>
                  <p className="price">
                    {`${data.price.currency === "ARS" ? "$" : "U$D"} ${parsePrice(data.price.amount)
                      }`}
                    <span className="cents">
                      {data.price.decimals === 0
                        ? "00"
                        : data.price.decimals}
                    </span>
                  </p>
                </div>
                <div className="productButton">
                  <button>Comprar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CardDetails;