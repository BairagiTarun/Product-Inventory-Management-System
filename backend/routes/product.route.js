'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product.model.js');

/**
 * Centralized error handler
 */
function handleError(res, err) {
    console.error(err);

    // Duplicate key error
    if (err.code === 11000) {
        return res.status(409).json({ message: 'Product Code already exists' });
    }

    return res.status(500).json({ message: 'Internal server error' });
}

/**
 * Validate Mongo ObjectId
 */
function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

/**
 * CREATE PRODUCT
 */
router.post('/products', async (req, res) => {
    try {
        const { productCode, productName, category, price } = req.body;

        if (!productCode || !productName || !category || price == null || price < 0) {
            return res.status(400).json({ message: 'Invalid product data' });
        }

        const product = await Product.create({
            productCode,
            productName,
            category,
            price
        });

        return res.status(201).json({
            message: 'Product Added',
            product
        });

    } catch (err) {
        return handleError(res, err);
    }
});

/**
 * GET ALL PRODUCTS
 */
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().lean();
        return res.status(200).json(products);
    } catch (err) {
        return handleError(res, err);
    }
});

/**
 * GET PRODUCT BY ID
 */
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(id).lean();
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);

    } catch (err) {
        return handleError(res, err);
    }
});

/**
 * UPDATE PRODUCT
 */
router.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price } = req.body;

        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        if (!productName || price == null || price < 0) {
            return res.status(400).json({ message: 'Invalid product data' });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { productName, price },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({
            message: 'Product Updated',
            product
        });

    } catch (err) {
        return handleError(res, err);
    }
});

/**
 * DELETE PRODUCT
 */
router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product Deleted' });

    } catch (err) {
        return handleError(res, err);
    }
});

module.exports = router;