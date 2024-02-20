function arrayizeChildren(routeTree) {
  let obj = {};
  // Top node doesn't have a value
  if (routeTree.value) {
    obj.value = routeTree.value;
  }

  if (routeTree.children) {
    let childrenArray = [];
    for (let i in routeTree.children) {
      let route = routeTree.children[i];
      childrenArray.push(arrayizeChildren(route));
    }
    obj.children = childrenArray;
  }

  return obj;
}