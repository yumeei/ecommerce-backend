import express from 'express';
import Product from '../models/Products.js';

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: err.message });
  }
});

router.post('/products', async (req, res) => {
  const { name, price, description, category, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ message: 'Tous les champs (name, price, description, stock, category) sont requis.' });
  }

  const product = new Product({
    name,
    price,
    description,
    category,
    stock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création du produit', error: err.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit', error: err.message });
  }
});

router.patch('/products/:id', async (req, res) => {
  const { name, price, description, category, stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du produit', error: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error: err.message });
  }
});

export default router;
