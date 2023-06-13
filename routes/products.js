import express from "express";
import { GetALLProductsStatic,GetALLProducts } from '../controllers/products.js';

const router = express.Router()

router.route("/").get(GetALLProducts)
router.route("/static").get(GetALLProductsStatic)

export default router;