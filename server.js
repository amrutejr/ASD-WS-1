const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();

const location = path.join(__dirname, "db.json");

async function readFile() {
  const data = await fs.readFile(location, "utf-8");
  return JSON.parse(data);
}

app.get("/products", async (req, res) => {
  try {
    const products = await readFile();

    console.log(products);
    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to read products"
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const products = await readFile();
    const id = Number(req.params.id);

    const product = products.find((item) => item.id === id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to read products"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});