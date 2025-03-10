Ecommerce Backend
Le backend de ce projet est une API RESTful permettant de gérer un site e-commerce. Il utilise Node.js avec Express pour gérer les requêtes HTTP, MongoDB comme base de données, et Jest pour les tests unitaires.

Table des matières<br>
Technologies
Installation
Configuration
Exécution du projet
Tests

Technologies
Node.js : Environnement d'exécution JavaScript côté serveur.
Express : Framework minimal et flexible pour la création d'API web.
MongoDB : Base de données NoSQL utilisée pour stocker les données du site.
Mongoose : ODM (Object Data Modeling) pour MongoDB, utilisé pour faciliter les interactions avec la base de données.
Jest : Framework de test JavaScript pour tester l'API.

Installation
Prérequis
Node.js installé sur votre machine.
MongoDB installé et en cours d'exécution sur votre machine (ou utilisez MongoDB Atlas).

Étapes
Clonez le repository :
git clone https://github.com/yumeei/ecommerce-backend.git
cd ecommerce-backend

Installez les dépendances du projet :
npm install

Configurez MongoDB :
Si vous utilisez MongoDB localement, assurez-vous que le serveur MongoDB est en cours d'exécution.
Si vous utilisez MongoDB Atlas, mettez à jour la chaîne de connexion MongoDB dans le fichier .env.
Créez un fichier .env à la racine du projet pour stocker vos variables d'environnement (exemple de contenu) :
MONGO_URI=mongodb://localhost:27017/ecommerceDB
PORT=5001

Configuration
Assurez-vous que MongoDB est correctement installé et en cours d'exécution. Si vous utilisez MongoDB Atlas, remplacez MONGO_URI par votre URI de connexion spécifique.

Exemple de chaîne de connexion MongoDB pour un serveur local :
MONGO_URI=mongodb://localhost:27017/ecommerceDB
Exemple de chaîne de connexion MongoDB pour MongoDB Atlas :
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerceDB?retryWrites=true&w=majority

Exécution du projet
Lancez le serveur avec la commande suivante :
npm start
Cela démarrera le serveur sur le port défini dans le fichier .env (par défaut, le port 5001).

Accédez à l'API
REST API est accessible sur : http://localhost:5001/api-docs/
GraphQL est accessible sur : http://localhost:5001/graphql

Tests
Les tests sont gérés par Jest. Pour exécuter les tests, vous pouvez utiliser la commande suivante :
Pour tester les utilisateurs: npx jest tests/userRoutes.test.js
Pour tester les produits: npx jest tests/productRoutes.test.js
