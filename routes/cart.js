const express = require('express');
const router = express.Router();
const fs = require('fs');

const CART_FILE = './data/cart.json';

// Get cart
router.get('/', (req, res) => {
  fs.readFile(CART_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading cart file');
    } else {
      res.send(data);
    }
  });
});

// Add item to cart
router.post('/add', (req, res) => {
  const newItem = req.body;
  fs.readFile(CART_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading cart file');
    } else {
      let cart = JSON.parse(data);
      cart.items.push(newItem);
      fs.writeFile(CART_FILE, JSON.stringify(cart), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing to cart file');
        } else {
          res.send(cart);
        }
      });
    }
  });
});

// Remove item from cart
router.post('/remove', (req, res) => {
  const itemId = req.body.id;
  fs.readFile(CART_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading cart file');
    } else {
      let cart = JSON.parse(data);
      cart.items = cart.items.filter(item => item.id !== itemId);
      fs.writeFile(CART_FILE, JSON.stringify(cart), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing to cart file');
        } else {
          res.send(cart);
        }
      });
    }
  });
});

module.exports = router;
