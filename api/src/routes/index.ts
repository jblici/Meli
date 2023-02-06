import {Router} from 'express';
import {getAllItems, getItem} from '../controllers/items';

// create an instance of the express Router
const router = Router();

// define a route for the GET request on "/items"
// and bind it to the `getAllItems` function in the `items` controller
router.get('/items', getAllItems);

// define a route for the GET request on "/items/:id"
// and bind it to the `getItem` function in the `items` controller
// the `:id` in the route is a parameter that will be passed to the function as `req.params.id`
router.get('/items/:id', getItem);

// export the router object as the default export
export default router;