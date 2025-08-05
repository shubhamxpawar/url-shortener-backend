import mongoose from "mongoose";
import express from "express";
import { handleGenerateShortId } from "../controllers/url.js";

export const router = express.Router()

router.route('/url')
    .post(handleGenerateShortId)