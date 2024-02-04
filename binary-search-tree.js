// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {

    constructor() {
      this.root = null;
    }

    insert(val, currentNode=this.root) {
      if (this.root === null) {
        this.root = new TreeNode(val);
      } else if (val > currentNode.val) {
        if (currentNode.right === null) {
          currentNode.right = new TreeNode(val);
        } else {
          this.insert(val, currentNode.right);
        }
      } else {
        if (currentNode.left === null) {
          currentNode.left = new TreeNode(val);
        } else {
          this.insert(val, currentNode.left);
        }
      }
    }

    search(val, currentNode = this.root) {
      if(currentNode === null) {
        return false;
      }
      if(currentNode.val === val) {
        return true;
      }
      if(val > currentNode.val) {
        return this.search(val, currentNode.right);
      }
      if(val < currentNode.val) {
        return this.search(val, currentNode.left);
      }
    }


    preOrderTraversal(currentNode = this.root) {
      if(currentNode === null) {
        return;
      }

      const stack = [];
      stack.push(currentNode);

      while (stack.length > 0) {
        let node = stack.pop();
        console.log(node.val);

        if(node.right !== null) {
          stack.push(node.right);
        }

        if(node.left !== null) {
          stack.push(node.left);
        }
      }
    }



    inOrderTraversal(currentNode = this.root) {
      if(currentNode === null) {
        return;
      }

      const stack = [];
      // stack.push(currentNode);

      while (stack.length > 0 || currentNode !== null) {
        while (currentNode !== null) {
          stack.push(currentNode);
          currentNode = currentNode.left;
        }

        let node = stack.pop();
        console.log(node.val);

        currentNode = node.right;
      }
    }


    postOrderTraversal(currentNode = this.root) {
      if(currentNode === null) {
        return;
      }

      this.postOrderTraversal(currentNode.left);
      this.postOrderTraversal(currentNode.right);
      console.log(currentNode.val);
    }

      // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
      const stack = [];
      stack.push(this.root);

      while(stack.length > 0) {
        let node = stack.shift();
        console.log(node.val);

        if(node.left !== null) {
          stack.push(node.left);
        }
        if(node.right !== null) {
          stack.push(node.right);
        }
      }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      const queue = [];
      queue.push(this.root);

      while(queue.length > 0) {
        let node = queue.pop();
        console.log(node.val);

        if(node.left !== null) {
          queue.push(node.left);
        }
        if(node.right !== null) {
          queue.push(node.right);
        }
      }
    }
  }

  module.exports = { BinarySearchTree, TreeNode };
