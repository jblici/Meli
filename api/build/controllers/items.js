"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = exports.getAllItems = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = __importDefault(require("../constants"));
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { query } = req.query;
    if (query) {
        axios_1.default.get(`${constants_1.default}/sites/MLA/search?q=${query}`).then((result) => {
            const categoriesFound = result.data.filters.find((el) => el.id === "category").values[0].path_from_root;
            const filterItems = result.data.results.slice(0, 4);
            let foundItems = [];
            let categories = [];
            if (categoriesFound.length > 1) {
                for (let i = 0; i < categoriesFound.length; i++) {
                    categories.push(categoriesFound[i].name);
                }
            }
            else {
                categories.push(categoriesFound[0].name);
            }
            for (let i = 0; i < filterItems.length; i++) {
                foundItems.push({
                    id: filterItems[i].id,
                    title: filterItems[i].title,
                    price: {
                        currency: filterItems[i].currency_id,
                        amount: filterItems[i].price % 1 === 0
                            ? filterItems[i].price
                            : Number(filterItems[i].price.toString().split(".")[0]),
                        decimals: filterItems[i].price % 1 === 0
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
});
exports.getAllItems = getAllItems;
const getItem = (req, res) => {
    const { id } = req.params;
    if (id) {
        const itemInfo = axios_1.default.get(`${constants_1.default}/items/${id}`);
        const itemDescription = axios_1.default.get(`${constants_1.default}/items/${id}/description`);
        Promise.all([itemInfo, itemDescription]).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            let [itemInfo, itemDescription] = result;
            let object = {
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
                        amount: itemInfo.data.price % 1 === 0
                            ? itemInfo.data.price
                            : Number(itemInfo.data.price.toString().split(".")[0]),
                        decimals: itemInfo.data.price % 1 === 0
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
            const categorys = yield axios_1.default.get(`${constants_1.default}/categories/${itemInfo.data.category_id}`);
            if (categorys.data.path_from_root.length > 1) {
                for (let i = 0; i < categorys.data.path_from_root.length; i++) {
                    object.categories.push(categorys.data.path_from_root[i].name);
                }
            }
            else {
                object.categories.push(categorys.data.path_from_root[0].name);
            }
            return res.send(object);
        }));
    }
};
exports.getItem = getItem;
