const express = require('express');
const fs = require('fs');

const router = express.Router();

// GET ALL PRODUCTS
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  res.status(200).send(data);
});

// GET PRODUCT BY ID
router.get('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const product = data.find((prod) => prod.id === req.params.id);

  if (!product) {
    res.status(404).send({ error: 'Product not found' });
  } else {
    res.status(200).send(product);
  }
});

// ADD PRODUCT
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const newProduct = {
    id: Date.now().toString(),
    ...req.body,
  };
  data.push(newProduct);
  fs.writeFileSync('./data/products.json', JSON.stringify(data));
  res.status(201).send(newProduct);
});

// UPDATE PRODUCT
router.put('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const productIndex = data.findIndex((prod) => prod.id === req.params.id);

  if (productIndex === -1) {
    res.status(404).send({ error: 'Product not found' });
  } else {
    const updatedProduct = { ...data[productIndex], ...req.body };
    data[productIndex] = updatedProduct;
    fs.writeFileSync('./data/products.json', JSON.stringify(data));
    res.status(200).send(updatedProduct);
  }
});

// DELETE PRODUCT
router.delete('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const filtered = data.filter((prod) => prod.id !== req.params.id);

  if (filtered.length === data.length) {
    res.status(404).send({ error: 'Product not found' });
  } else {
    fs.writeFileSync('./data/products.json', JSON.stringify(filtered));
    res.status(204).send();
  }
});

module.exports = router;
