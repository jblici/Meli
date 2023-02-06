"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_1 = require("../controllers/items");
const router = (0, express_1.Router)();
router.get('/items', items_1.getAllItems);
router.get('/items/:id', items_1.getItem);
exports.default = router;
