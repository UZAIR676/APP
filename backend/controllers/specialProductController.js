// specialProductController.js

import SpecialProduct from '../models/SpecialProduct.js'; // Correct import


// Create a new special product
export const createSpecialProduct = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const newProduct = new SpecialProduct({
            name,
            description,
            price,
            image
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating special product', error });
    }
};

// Get all special products
export const getAllSpecialProducts = async (req, res) => {
    try {
        const products = await SpecialProduct.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching special products', error });
    }
};

// Get a single special product by ID
export const getSpecialProductById = async (req, res) => {
    try {
        const product = await SpecialProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching special product', error });
    }
};

// Update a special product by ID
export const updateSpecialProduct = async (req, res) => {
    try {
        const updatedProduct = await SpecialProduct.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating special product', error });
    }
};

// Delete a special product by ID
export const deleteSpecialProduct = async (req, res) => {
    try {
        const deletedProduct = await SpecialProduct.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting special product', error });
    }
};
