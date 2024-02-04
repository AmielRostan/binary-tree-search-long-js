const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  if(rootNode === null) {
    return;
  }
  if(rootNode.left !== null) {
    return findMinBST(rootNode.left);
  }
  return rootNode.val;
}

function findMaxBST (rootNode) {
  if(rootNode === null) {
    return;
  }
  if(rootNode.right !== null) {
    return findMaxBST(rootNode.right);
  }
  return rootNode.val;
}

function findMinBT (rootNode) {
  if(rootNode === null) {
    return null;
  }

  const stack = [rootNode];
  let minValue = rootNode.val;

  while(stack.length > 0) {
    const current = stack.pop();

    if(current.val < minValue) {
      minValue = current.val;
    }

    if(current.right !== null) {
      stack.push(current.right);
    }

    if(current.left !== null) {
      stack.push(current.left);
    }
  }

  return minValue;
}

function findMaxBT (rootNode) {
  if(rootNode === null) {
    return null;
  }

  const stack = [rootNode];
  let maxValue = rootNode.val;

  while(stack.length > 0) {
    const current = stack.pop();

    if(current.val > maxValue) {
      maxValue = current.val;
    }

    if(current.right !== null) {
      stack.push(current.right);
    }

    if(current.left !== null) {
      stack.push(current.left);
    }
  }

  return maxValue;
}

function getHeight (rootNode) {
  if(rootNode === null) {
    return -1;
  }

  const left = getHeight(rootNode.left);
  const right = getHeight(rootNode.right);
  if(left > right) {
    return left + 1;
  } else {
    return right + 1;
  }
}

function balancedTree (rootNode) {
  if(rootNode === null) {
    return true;
  }

  const leftHeight = getHeight(rootNode.left);
  const rightHeight = getHeight(rootNode.right);

  if(Math.abs(leftHeight - rightHeight) <= 1 &&
     balancedTree(rootNode.left) &&
     balancedTree(rootNode.right)) {
    return true;
  }

  return false;
}

function countNodes (rootNode) {
  if(rootNode === null) {
    return 0;
  }

  return countNodes(rootNode.left) + countNodes(rootNode.right) + 1;
}

function getParentNode (rootNode, target) {
  if(rootNode === null) {
    return undefined;
  }

  if(rootNode.val === target) {
    return null;
  }

  const stack = [rootNode];

  while(stack.length > 0) {
    const current = stack.pop();

    if(current.right !== null) {
      if(current.right.val === target) {
        return current;
      }
      stack.push(current.right);
    }

    if(current.left !== null) {
      if(current.left.val === target) {
        return current;
      }
      stack.push(current.left);
    }
  }

  return undefined;
}

function inOrderPredecessor (rootNode, target) {
  let predecessor = null;
  let current = rootNode;

  while(current !== null) {
    if (current.val === target) {
      if(current.left !== null) {
        let temp = current.left;
        while(temp.right !== null) {
          temp = temp.right;
        }
        predecessor = temp;
      }
      break;
    } else if (current.val < target) {
      predecessor = current;
      current = current.right;
    } else {
      current = current.left;
    }
  }

  if(predecessor === null) {
    return predecessor;
  }

  return predecessor.val;
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let parent = null;
  let current = rootNode;

  while (current !== null && current.val !== target) {
    parent = current;
    if (target < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  // Undefined if the target cannot be found
  if(current === null) {
    return undefined;
  }

  // Set target based on parent

  // Case 0: Zero children and no parent:
  if(parent === null && current.left === null && current.right === null) {
    //   return null
    return null;
  }

  // Case 1: Zero children:
  if(current.left === null && current.right === null) {
    //   Set the parent that points to it to null
    if(target < parent.val) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  }

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.
  else if (current.left !== null && current.right !== null) {
    let predecessor = current.left;
    while (predecessor.right !== null) {
      predecessor = predecessor.right;
    }

    current.val = predecessor.val;

    current.left = deleteNodeBST(current.left, predecessor.val);
  }

  // Case 3: One child:
  //   Make the parent point to the child
  else {
    const child = (current.left !== null) ? current.left : current.right;

    if(parent === null) {
      return child;
    }

    if(target < parent.val) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  return rootNode;

}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
