function sortByPlatform(props, nameA, nameB) {
  var a = props[nameA];
  var b = props[nameB];

  if (a.platforms && !b.platforms) {
    return 1;
  }
  if (b.platforms && !a.platforms) {
    return -1;
  }

  // Cheap hack: use < on arrays of strings to compare the two platforms
  if (a.platforms < b.platforms) {
    return -1;
  }
  if (a.platforms > b.platforms) {
    return 1;
  }

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}