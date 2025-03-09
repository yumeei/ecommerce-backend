import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users.js';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: err.message });
  }
});

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs (name, email, password) sont requis.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'L\'email est déjà utilisé.' });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    // if (req.user.id !== req.params.id) {
    //   return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cet utilisateur" });
    // }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});


export default router;
