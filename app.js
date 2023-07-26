const express = require('express');
const items = require('./fakeDb');
const app = express();

app.use(express.json());

// GET /items - Get the list of shopping items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Add a new item to the shopping list
app.post('/items', (req, res) => {
  const { name, price } = req.body;
  const newItem = { name, price };
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// GET /items/:name - Get a single item by name
app.get('/items/:name', (req, res) => {
  const { name } = req.params;
  const foundItem = items.find(item => item.name === name);
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// PATCH /items/:name - Update an existing item
app.patch('/items/:name', (req, res) => {
  const { name } = req.params;
  const { price } = req.body;
  const foundItem = items.find(item => item.name === name);
  if (foundItem) {
    foundItem.price = price;
    res.json({ updated: foundItem });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE /items/:name - Delete an item from the shopping list
app.delete('/items/:name', (req, res) => {
  const { name } = req.params;
  const index = items.findIndex(item => item.name === name);
  if (index !== -1) {
    items.splice(index, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

module.exports = app;
