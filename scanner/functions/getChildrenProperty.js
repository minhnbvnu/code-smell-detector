function getChildrenProperty(route, prop) {
  return route.children.map((item) => get(item.value, prop));
}