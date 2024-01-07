function insertContainingTag(tag, index, tags, indices) {
  const i = indices.findIndex(existingIndex => existingIndex > index);
  if (i === -1) {
    tags.push(tag);
    indices.push(index);
  } else {
    tags.splice(i, 0, tag);
    indices.splice(i, 0, index);
  }
}