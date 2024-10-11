import MenuItem from '../models/menuItem.js';

// Create a new menu item
export const createMenu = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const newProduct = new MenuItem({
            name,
            description,
            price,
            image
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating menu item', error });
    }
};

// Get all menu items
export const getAllMenu = async (req, res) => {
    try {
        const products = await MenuItem.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
};

// Get a single menu item by ID
export const getMenuById = async (req, res) => {
    try {
        const product = await MenuItem.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu item', error });
    }
};

// Update a menu item by ID
export const updateMenu = async (req, res) => {
    try {
        const updatedProduct = await MenuItem.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu item', error });
    }
};

// Delete a menu item by ID
export const deleteMenu = async (req, res) => {
    try {
        const deletedProduct = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item', error });
    }
};
