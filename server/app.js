const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log("posttt", post);
  res.status(201).json({
    message: 'Post Created Successfully'
  });
});
app.get("/api/posts", (req, res, next) => {
  const posts = [{
      id: "1",
      title: "first title",
      content: "first content"
    },
    {
      id: "2",
      title: "second title",
      content: "second content"
    },
    {
      id: "3",
      title: "third title",
      content: "third content"
    }
  ];
  res.status(200).json({
    messages: 'Posts data successfully',
    posts: posts
  });
});


module.exports = app;
