const Post = require("../models/post");

exports.createPost = (req, res, next) => {

  const url = req.protocol + "://" + req.get("host");
  const serviceName = req.body.title.toLowerCase().split(' ').join('-');  
  console.log("Register service with name "+serviceName);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    filePath: req.body.file,
    creator: req.body.userId,
    servicePath: req.body.servicePath,
    serviceName: serviceName
  });
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully!",
        post: {
          id: createdPost._id,
          title: createdPost.title,
          content: createdPost.content,
          serviceName: createdPost.serviceName,
          creator: createdPost.creator
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a post failed!",
      });
    });
};

exports.updatePost = (req, res, next) => {
  const filePath = req.body.imagePath;
  const serviceName = req.body.title.toLowerCase().split(' ').join('-');
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    filePath = req.file.filePath;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    filePath: filePath,
    creator: req.body.userId,
    servicePath: req.body.servicePath,
    serviceName: req.body.serviceName
  });

  Post.updateOne({ _id: req.params.id }, post)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status.json({ message: "Not authorized!" });
      }
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update post!",
      });
    });
};

exports.getPosts = (req, res, next) => {
  console.log("get all posts");
  const pageSize = parseInt(req.query.pageSize);
  const currentPage = parseInt(req.query.page);
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      this.fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Post fetched succesfully!",
        posts: this.fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed!",
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed!",
      });
    });
};

exports.findPostByServiceName = (req, res, next) => {
  console.log('FIND POST BY SERVICE NAME', req.params.serviceName);
  Post.findOne({serviceName: req.params.serviceName}).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
  .catch((error) => {
    res.status(500).json({
      message: "Fetching posts failed!",
    });
  });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed!",
      });
    });
};
