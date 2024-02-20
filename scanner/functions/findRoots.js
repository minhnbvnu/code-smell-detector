function findRoots({ first, last, parent }) {
  const closest = parent.childNodes;

  const roots = getUnfilteredRoots(first, last, closest);

  return roots.filter((el) => el?.nodeType === 1);
}