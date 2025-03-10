Ecommerce Backend<br>
Le backend de ce projet est une API RESTful permettant de gérer un site e-commerce. Il utilise Node.js avec Express pour gérer les requêtes HTTP, MongoDB comme base de données, et Jest pour les tests unitaires.<br>

Table des matières<br>
Technologies<br>
Installation<br>
Configuration<br>
Exécution du projet<br>
Tests<br>
API<br>

Technologies<br>
Node.js : Environnement d'exécution JavaScript côté serveur.<br>
Express : Framework minimal et flexible pour la création d'API web.<br>
MongoDB : Base de données NoSQL utilisée pour stocker les données du site.<br>
Mongoose : ODM (Object Data Modeling) pour MongoDB, utilisé pour faciliter les interactions avec la base de données.<br>
Jest : Framework de test JavaScript pour tester l'API.<br>
Apollo Server : Serveur GraphQL qui permet de gérer les requêtes et mutations GraphQL.<br>

Installation<br>
Prérequis<br>
Node.js installé sur votre machine.<br>
MongoDB installé et en cours d'exécution sur votre machine (ou utilisez MongoDB Atlas).<br>

Étapes<br>
Clonez le repository :<br>
git clone https://github.com/yumeei/ecommerce-backend.git<br>
cd ecommerce-backend<br>

Installez les dépendances du projet :<br>
npm install<br>

Configurez MongoDB :<br>
Si vous utilisez MongoDB localement, assurez-vous que le serveur MongoDB est en cours d'exécution.<br>
Si vous utilisez MongoDB Atlas, mettez à jour la chaîne de connexion MongoDB dans le fichier .env.<br>
Créez un fichier .env à la racine du projet pour stocker vos variables d'environnement (exemple de contenu) :<br>
MONGO_URI=mongodb://localhost:27017/ecommerceDB<br>
PORT=5001<br>

Configuration<br>
Assurez-vous que MongoDB est correctement installé et en cours d'exécution. Si vous utilisez MongoDB Atlas, remplacez MONGO_URI par votre URI de connexion spécifique.<br>

Exemple de chaîne de connexion MongoDB pour un serveur local :<br>
MONGO_URI=mongodb://localhost:27017/ecommerceDB<br>
Exemple de chaîne de connexion MongoDB pour MongoDB Atlas :<br>
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerceDB?retryWrites=true&w=majority<br>

Exécution du projet<br>
Lancez le serveur avec la commande suivante :<br>
npm start<br>
Cela démarrera le serveur sur le port défini dans le fichier .env (par défaut, le port 5001).<br>

Accédez à l'API<br>
REST API est accessible sur : http://localhost:5001/api-docs/<br>
GraphQL est accessible sur : http://localhost:5001/graphql<br>

Tests<br>
Les tests sont gérés par Jest. Pour exécuter les tests, vous pouvez utiliser la commande suivante :<br>
Pour tester les utilisateurs: npx jest tests/userRoutes.test.js<br>
Pour tester les produits: npx jest tests/productRoutes.test.js<br>

