import Product from "../../models/Products.js";

const productResolvers = {
  Query: {
    getAllProducts: async () => await Product.find(),
    getProductById: async (_, { productId }) => await Product.findById(productId),
  },

  Mutation: {
    createProduct: async (_, { name, description, price, stock, category }) => {
      const newProduct = new Product({ name, description, price, stock, category });

      try {
        await newProduct.save();
        return { code: 201, success: true, message: "Produit créé avec succès", product: newProduct };
      } catch {
        return { code: 500, success: false, message: "Erreur lors de la création du produit", product: null };
      }
    },

    updateProduct: async (_, { productId, name, description, price, stock }) => {
      const product = await Product.findById(productId);
      if (!product) return { code: 404, success: false, message: "Produit non trouvé", product: null };

      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (stock) product.stock = stock;

      await product.save();
      return { code: 200, success: true, message: "Produit mis à jour", product };
    },

    deleteProduct: async (_, { productId }) => {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) return { code: 404, success: false, message: "Produit non trouvé" };

      return { code: 200, success: true, message: "Produit supprimé" };
    },
  },
};

export default productResolvers;
