const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();

// router.post('',
//     extractFile,
//     postController.createPost
// );

// TODO: complete this object/class

// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage){
    this.itemCount = collection.length;
    this.pageCount = Math.ceil(this.itemCount / itemsPerPage);
    this.itemsPerPage = itemsPerPage;
  }
  
  // returns the number of items within the entire collection
  PaginationHelper.prototype.itemCount = function() {
    return this.itemCount;
  }
  
  // returns the number of pages
  PaginationHelper.prototype.pageCount = function() {
     return this.pageCount;
  }

router.get('', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('', postController.createPost);
router.put("/:id", postController.updatePost)
router.delete("/:id", postController.deletePost)

//we wxports whole router object, not methods od object(that why we dont have {})
module.exports = router;