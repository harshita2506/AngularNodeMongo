const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/test');

mongoose.connection.once('open', (() => {
  console.log("connection has been made");
}).on('error')((error) => {
  console.log("ooooooooooo", error);
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log("posttt", post);
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post Created Successfully',
      postId: createdPost._id
    });
  });
});

app.put("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({
    _id: req.params.id
  }, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Updated Successfully"
    })
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

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: 'Page not found'
      })
    }
  })
})


app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result)
    res.status(200).json({
      message: "Post Deleted"
    })
  });
});


module.exports = app;
