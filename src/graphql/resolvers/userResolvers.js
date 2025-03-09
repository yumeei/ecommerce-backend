import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/Users.js";

const userResolvers = {
  Query: {
    getAllUsers: async () => await User.find(),
    getUserById: async (_, { userId }) => await User.findById(userId),
  },

  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) return { code: 400, success: false, message: "L'email est déjà utilisé.", user: null };

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });

      try {
        await newUser.save();
        return { code: 201, success: true, message: "Utilisateur créé avec succès", user: newUser };
      } catch {
        return { code: 500, success: false, message: "Erreur lors de la création de l'utilisateur", user: null };
      }
    },

    signIn: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) return { code: 404, success: false, message: "Utilisateur non trouvé", token: null };

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return { code: 401, success: false, message: "Mot de passe incorrect", token: null };

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { code: 200, success: true, message: "Connexion réussie", token };
    },

    updateUser: async (_, { id, name, email, password }) => {
      const user = await User.findById(id);
      if (!user) return { code: 404, success: false, message: "Utilisateur non trouvé", user: null };

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);

      await user.save();
      return { code: 200, success: true, message: "Utilisateur mis à jour", user };
    },

    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);
      if (!user) return { code: 404, success: false, message: "Utilisateur non trouvé" };

      return { code: 200, success: true, message: "Utilisateur supprimé" };
    },
  },
};

export default userResolvers;
