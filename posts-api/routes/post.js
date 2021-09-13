const express = require("express");

const userController = require("../controllers/post");
const extractFile = require("../middleware/file"); 


const router = express.Router();

router.post('',
    extractFile,
    userController.createPost
);

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

router.get('', userController.getPosts);
router.get('/:id', userController.getPost);
router.put("/:id", extractFile, userController.updatePost)
router.delete("/:id", userController.deletePost)

//we wxports whole router object, not methods od object(that why we dont have {})
module.exports = router;