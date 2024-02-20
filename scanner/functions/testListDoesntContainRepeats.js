function testListDoesntContainRepeats (t, list) {
  const clone = new Set(list);
  if (clone.size === list.length) {
    return;
  }
  
  for (const item of list) {
    if (clone.has(item)) {
      clone.delete(item);
    } else {
      t.fail(`domain ${item} is duplicated. Domains can only appear in the list once`);
    }
  }
}