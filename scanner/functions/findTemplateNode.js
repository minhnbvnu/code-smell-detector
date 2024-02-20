function findTemplateNode(root, nodeInfo) {
    // recursively ascend tree until we hit root
    let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
    // unwind the stack, returning the indexed node at each level
    if (parent) {
      // note: marginally faster than indexing via childNodes
      // (http://jsperf.com/childnodes-lookup)
      walker.currentNode = parent;
      for (let n=walker.firstChild(), i=0; n; n=walker.nextSibling()) {
        if (nodeInfo.parentIndex === i++) {
          return n;
        }
      }
    } else {
      return root;
    }
  }