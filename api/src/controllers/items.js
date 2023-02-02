const axios = require("axios");
const e = require("express");
const { BASE_URL } = require("../../constants");

async function getAllItems(req, res, next) {
  let { query } = req.query;
  if (query) {
    axios.get(`${BASE_URL}/sites/MLA/search?q=${query}`)
    .then((result) => {  
      const categoriesFound = result.data.filters.find(el => el.id === 'category').values[0]?.path_from_root
      const filterItems = result.data.results.slice(0,4);
      let foundItems = [];
      let categories = [];
      if(categoriesFound.length > 1) {
        for(cat in categoriesFound) {
          categories.push(categoriesFound[cat].name)
        }
      } else {
        categories = categoriesFound[0].name
      }
      for (item in filterItems) {
        foundItems.push({
          id: filterItems[item].id,
          title: filterItems[item].title,
          price: {
            currency: filterItems[item].currency_id,
            amount: filterItems[item].price % 1 === 0 ? filterItems[item].price : Number(filterItems[item].price.toString().split('.')[0]),
            decimals: filterItems[item].price % 1 === 0 ? 00 : Number(filterItems[item].price.toString().split('.')[1])
          },
          pictures: filterItems[item].thumbnail,
          condition: filterItems[item].condition,
          free_shipping: filterItems[item].shipping.free_shipping
        })
      }
      let object = {
        categories: categories,
        items: foundItems
      };
      return res.send(object);
    });
  }
}

async function getItem(req, res, next) {
  const { id } = req.params;
  if (id) {
    const itemInfo = axios.get(`${BASE_URL}/items/${id}`);
    const itemDescription = axios.get(`${BASE_URL}/items/${id}/description`);
    Promise.all([itemInfo, itemDescription])
    .then((result) => {

      let [itemInfo, itemDescription] = result;
      let object = {
        item: {
          id: itemInfo.data.id,
          title: itemInfo.data.title,
          price: {
            currency: itemInfo.data.currency_id,
            amount: itemInfo.data.price % 1 === 0 ? itemInfo.data.price : Number(itemInfo.data.price.toString().split('.')[0]),
            decimals: itemInfo.data.price % 1 === 0 ? 00 : Number(itemInfo.data.price.toString().split('.')[1])
          },
          pictures: itemInfo.data.pictures[0].url,
          condition: itemInfo.data.condition,
          free_shipping: itemInfo.data.shipping.free_shipping,
          sold_quantity: itemInfo.data.sold_quantity,
          description: itemDescription.data.plain_text,
        },
      };
      return res.send(object);
    });
    //return res.send(response.data);
  }
}

module.exports = {
  getAllItems,
  getItem,
};
