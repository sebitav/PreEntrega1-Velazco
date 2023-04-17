const express = require('express');
const app = express();
const cartRouter = require('./routes/cart');

app.use(express.json());
app.use('/cart', cartRouter);
app.use(express.static('public'));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

