function writeVec2(node, vec2) {
  node.setAttribute('x', String(vec2.x));
  node.setAttribute('y', String(vec2.y));
  node.setAttribute('xunits', vec2.xunits);
  node.setAttribute('yunits', vec2.yunits);
}