const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const usersFilePath = 'users.json';

let users = [];

fs.readFile(usersFilePath, (err, data) => {
  if (!err) {
    users = JSON.parse(data);
  }
});



app.post('/cart/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user in the JSON data
  const user = users.find((user) => user.username === email && user.password === password);

  if (user) {
   
    res.json({ message: 'Login successful' });
  } else {
    // User not found or wrong credentials
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/cart/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = users.some((user) => user.username === email);

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    // Create a new user
    const newUser = { name, username: email, password };
    users.push(newUser);

    // Save the updated user data to the JSON file
    fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error('Error saving user data:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json({ message: 'User registered successfully' });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});