const express = require("express");
const products = require("./db.json");

const app = express();

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});