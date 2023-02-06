import {Request, Response} from 'express';
import axios from 'axios'
import BASE_URL from '../constants';

interface Category {
  id: string
  name:string
  type:string
  values: Array<object>
}

export const getAllItems = async (req: Request, res: Response) => {
  let { query } = req.query;
  if (query) {
    axios.get(`${BASE_URL}/sites/MLA/search?q=${query}`).then((result) => {
      const categoriesFound = result.data.filters.find(
        (el: Category) => el.id === "category").values[0].path_from_root;
      const filterItems = result.data.results.slice(0, 4);
      let foundItems = [];
      let categories = [];
      if (categoriesFound.length > 1) {
        for (let i = 0; i < categoriesFound.length; i++) {
          categories.push(categoriesFound[i].name);
        }
      } else {
        categories.push(categoriesFound[0].name);
      }
      for (let i = 0; i < filterItems.length; i++) {
        foundItems.push({
          id: filterItems[i].id,
          title: filterItems[i].title,
          price: {
            currency: filterItems[i].currency_id,
            amount:
              filterItems[i].price % 1 === 0
                ? filterItems[i].price
                : Number(filterItems[i].price.toString().split(".")[0]),
            decimals:
              filterItems[i].price % 1 === 0
                ? 0o0
                : Number(filterItems[i].price.toString().split(".")[1]),
          },
          pictures: filterItems[i].thumbnail,
          condition: filterItems[i].condition,
          free_shipping: filterItems[i].shipping.free_shipping,
        });
      }
      let object = {
        author: {
          name: "Juan Bautista",
          lastname: "Felici",
        },
        categories: categories,
        items: foundItems,
      };
      return res.send(object);
    });
  }
}

interface Object {
  author: object
  categories: Array<string>
  item: object
}

export const getItem = (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    const itemInfo = axios.get(`${BASE_URL}/items/${id}`);
    const itemDescription = axios.get(`${BASE_URL}/items/${id}/description`);
    Promise.all([itemInfo, itemDescription]).then(async (result) => {
      let [itemInfo, itemDescription] = result;
      let object: Object = {
        author: {
          name: "Juan Bautista",
          lastname: "Felici",
        },
        categories: [],
        item: {
          id: itemInfo.data.id,
          title: itemInfo.data.title,
          price: {
            currency: itemInfo.data.currency_id,
            amount:
              itemInfo.data.price % 1 === 0
                ? itemInfo.data.price
                : Number(itemInfo.data.price.toString().split(".")[0]),
            decimals:
              itemInfo.data.price % 1 === 0
                ? 0o0
                : Number(itemInfo.data.price.toString().split(".")[1]),
          },
          pictures: itemInfo.data.pictures[0].url,
          condition: itemInfo.data.condition,
          free_shipping: itemInfo.data.shipping.free_shipping,
          sold_quantity: itemInfo.data.sold_quantity,
          description: itemDescription.data.plain_text,
        },
      };
      const categorys = await axios.get(
        `${BASE_URL}/categories/${itemInfo.data.category_id}`
      );
      if (categorys.data.path_from_root.length > 1) {
        for (let i = 0; i < categorys.data.path_from_root.length; i++) {
          object.categories.push(categorys.data.path_from_root[i].name);
        }
      } else {
        object.categories.push(categorys.data.path_from_root[0].name);
      }

      return res.send(object);
    });
  }
}