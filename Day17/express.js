const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];

app.get('/products', (req, res) => {
  res.send(products);
});
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.filter(p=>p.id == id);
  res.send(product);
});
app.get('/products/search', (req, res) => {
  const minPrice = req.params.minPrice;
  const maxPrice = req.params.maxPrice;
  const product = products.filter(p=>p.price >= minPrice && p.price <= maxPrice);
  res.send(product);
});

app.post('/products', (req, res) => {
    
    const newProduct = {
        id: products[products.length -  1].id +  1,
        name: req.body.name,
        price: req.body.price
      };
      products.push(newProduct);
      res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const index = products.findIndex(p => p.id == productId);
    const updatedProduct = {
      id: productId,
      name: req.body.name ,
      price: req.body.price
    };
    products[index] = updatedProduct;
    res.json(updatedProduct);
});

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);
    products.splice(index,   1);
    res.status(204).send();
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});