//index.js
// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

// Connect to MongoDB database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'users' // Specify the database name here
})
.then(() => {
  console.log("Connected to MongoDB database");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Define product schema
const productSchema = new mongoose.Schema({
  productName: String,
  shopName: String,
  shopLocation: String,
  pincode: String,
  phoneNumber: String,
});

// Define product model
const Product = mongoose.model('Product', productSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle form submission
app.post("/addform", async (req, res) => {
  try {
    // Create a new Product document with data from the request body
    const newProduct = new Product(req.body);
    
    // Save the new Product document to the database
    await newProduct.save();

    // Send success response
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// index.js (Server-side)

// Route to fetch all products from the database
app.get("/products", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/products/:pincode", async (req, res) => {
  try {
    const pincode = req.params.pincode;
    const products = await Product.find({ pincode: pincode });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by pincode:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
