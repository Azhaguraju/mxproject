import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const mockItems = [
  { name: 'Item 1', price: '$10.00', link: 'http://example.com/item1' },
  { name: 'Item 2', price: '$20.00', link: 'http://example.com/item2' },
  { name: 'Item 3', price: '$30.00', link: 'http://example.com/item3' },
  { name: 'Item 4', price: '$40.00', link: 'http://example.com/item4' },
  { name: 'Item 5', price: '$50.00', link: 'http://example.com/item5' },
  { name: 'Item 6', price: '$60.00', link: 'http://example.com/item6' },
  { name: 'Item 7', price: '$70.00', link: 'http://example.com/item7' },
  { name: 'Item 8', price: '$80.00', link: 'http://example.com/item8' },
  { name: 'Item 9', price: '$90.00', link: 'http://example.com/item9' },
  { name: 'Item 10', price: '$100.00', link: 'http://example.com/item10' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.get('/items', (req, res) => {
  res.json(mockItems);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
