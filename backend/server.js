require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

// Define Blog Model
const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Sync Database
sequelize.sync()
  .then(() => console.log('✅ Database connected and BlogPost table created'))
  .catch(err => console.error('❌ Error connecting to database:', err));

// API Routes
app.get('/posts', async (req, res) => {
  const posts = await BlogPost.findAll();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = await BlogPost.create({ title, content });
  res.json(newPost);
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await BlogPost.destroy({ where: { id } });
  res.json({ message: 'Post deleted' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
