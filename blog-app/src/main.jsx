import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react';

const navLinks = [
  {home :"HOME", about :"ABOUT", blogs:"BLOGS", login :"LOG IN" }
]
const posts = [
  {
     title: "Post 1",
     description: "This is the description for Post 1."
  },
  {
     title: "Post 2",
     description: "This is the description for Post 2."
  },
  {
     title: "Post 3",
     description: "This is the description for Post 3."
  }
 ];

const color = "green"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App navLinks={navLinks} posts={posts} color={color} />
  </React.StrictMode>
)
