function findCoodrs(root, target) {
  for (let y = 0; y < root.children.length; y += 1) {
    const div = root.children[y];
    for (let x = 0; x < div.children.length; x += 1) {
      const checkbox = div.children[x];
      if (checkbox === target) {
        return { x, y };
      }
    }
  }
  return null;
}