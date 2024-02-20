function getAllNextSiblings() {
  let _key = this.key;
  let sibling = this.getSibling(++_key);
  const siblings = [];

  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(++_key);
  }

  return siblings;
}