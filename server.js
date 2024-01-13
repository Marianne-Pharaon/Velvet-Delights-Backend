require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dbConnection = require("./config/db");
const bodyParser = require("body-parser");
const cartRoutes = require("./Routes/CartRoutes");
const checkoutRoutes = require("./Routes/CheckoutRoutes");
const templatesRoutes = require("./Routes/TemplatesRoutes");
const categoriesRoutes = require("./Routes/CategoriesRoutes");
const usersRoutes = require("./Routes/UsersRoutes");
const productsRoutes = require("./Routes/ProductsRoutes");
const custom_OrderRoutes = require("./Routes/CustomOrderRoutes");

const app = express();
const port = process.env.PORT || 8000; 

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());

app.use("/categories", categoriesRoutes);
app.use("/user", usersRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/custom-orders", custom_OrderRoutes);
app.use("/products", productsRoutes);
app.use("/templates", templatesRoutes);


app.listen(port, () => {
    dbConnection()
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));
    console.log(`Example app listening on port ${port}`);
});
