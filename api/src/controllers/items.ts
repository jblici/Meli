import { Request, Response } from 'express';
import axios from 'axios';
import BASE_URL from '../constants';

// Creamos la interfaz para el objeto Category
interface Category {
  id: string;
  name: string;
  type: string;
  values: Array<object>;
}

// Creamos la función para obtener todos los items de la api de Mercadolibre
export const getAllItems = async (req: Request, res: Response) => {
  // Get the query parameter from the request
  // Obtenemos el parámetro query para buscar los items.
  let { query } = req.query;
  if (query) {
    // Creamos el GET request de la api de Meli con el parámetro query.
    axios
      .get(`${BASE_URL}/sites/MLA/search?q=${query}`)
      .then((result) => {
        // Filtramos el resultado de category de la respuesta de la api en una array.
        const categoriesFound = result.data.filters.find(
          (el: Category) => el.id === 'category'
        ).values[0].path_from_root;
        // Cortamos los primeros 4 resultados.
        const filterItems = result.data.results.slice(0, 4);
        let foundItems = [];
        let categories = [];
        if (categoriesFound.length > 1) {
          // Si hay mas de una categoría loopeamos para luego pushear las categorías en una array
          for (let i = 0; i < categoriesFound.length; i++) {
            categories.push(categoriesFound[i].name);
          }
        } else {
          // Si hay una sola simplemente pusheamos esa categoría al array
          categories.push(categoriesFound[0].name);
        }
        // Loopeamos los 4 items que cortamos de la respuesta de la api
        for (let i = 0; i < filterItems.length; i++) {
          // Pusheamos cada item a un array.
          foundItems.push({
            id: filterItems[i].id,
            title: filterItems[i].title,
            price: {
              currency: filterItems[i].currency_id,
              amount:
                filterItems[i].price % 1 === 0
                  ? filterItems[i].price
                  : Number(filterItems[i].price.toString().split('.')[0]),
              decimals:
                filterItems[i].price % 1 === 0
                  ? 0o0
                  : Number(filterItems[i].price.toString().split('.')[1]),
            },
            pictures: filterItems[i].thumbnail,
            condition: filterItems[i].condition,
            free_shipping: filterItems[i].shipping.free_shipping,
          });
        }
        // Creamos un objeto con el array de los items, de las categorías y ademas agregamos mis datos personales como dice el challenge.
        let object = {
          author: {
            name: 'Juan Bautista',
            lastname: 'Felici',
          },
          categories: categories,
          items: foundItems,
        };
        // Enviamos la respuesta
        return res.send(object);
      });
  }
};

// Creamos la interfaz de la respuesta que vamos a enviar.
interface Object {
  author: object
  categories: Array<string>
  item: object
}

// Creamos la función para obtener un item en particular.
export const getItem = (req: Request, res: Response) => {
  // Get the id from the request parameters
  // Obtenemos el id de los parámetros del request.
  const { id } = req.params;

  if (id) {
    // Llamamos a la api de meli para los items
    const itemInfo = axios.get(`${BASE_URL}/items/${id}`);
    // Llamamos a la api de meli para obtener la descripción de dicho item.
    const itemDescription = axios.get(`${BASE_URL}/items/${id}/description`);

    // Generamos una doble promesa para manejar la informacion obtenida de una manera mas simple gracias a la destructuración de los datos.
    Promise.all([itemInfo, itemDescription]).then(async (result) => {
      // Destructuramos la respuesta.
      let [itemInfo, itemDescription] = result;

      // Inicializamos el objeto con el que vamos a responder con la información que obtenemos del item y el author como en la función anterior.
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

      // Llamamos una vez mas a la api de meli para obtener la categoría del item. (este paso no estaba dentro de la explicación del challenge)
      const categorys = await axios.get(
        `${BASE_URL}/categories/${itemInfo.data.category_id}`
      );

      // Creamos el mismo algoritmo que en la funcion anterior donde nos fijamos si hay mas de una categoría loopeamos y pusheamos el nombre y si hay una sola simplemente pusheamos.
      if (categorys.data.path_from_root.length > 1) {
        for (let i = 0; i < categorys.data.path_from_root.length; i++) {
          object.categories.push(categorys.data.path_from_root[i].name);
        }
      } else {
        object.categories.push(categorys.data.path_from_root[0].name);
      }

      // Enviamos el objeto instanciado previamente como respuesta.
      return res.send(object);
    });
  }
}