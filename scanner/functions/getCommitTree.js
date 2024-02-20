function getCommitTree({
  commitIndex,
  profilerStore,
  rootID
}) {
  if (!rootToCommitTreeMap.has(rootID)) {
    rootToCommitTreeMap.set(rootID, []);
  }

  const commitTrees = rootToCommitTreeMap.get(rootID);

  if (commitIndex < commitTrees.length) {
    return commitTrees[commitIndex];
  }

  const {
    profilingData
  } = profilerStore;

  if (profilingData === null) {
    throw Error(`No profiling data available`);
  }

  const dataForRoot = profilingData.dataForRoots.get(rootID);

  if (dataForRoot == null) {
    throw Error(`Could not find profiling data for root "${rootID}"`);
  }

  const {
    operations
  } = dataForRoot;

  if (operations.length <= commitIndex) {
    throw Error(`getCommitTree(): Invalid commit "${commitIndex}" for root "${rootID}". There are only "${operations.length}" commits.`);
  }

  let commitTree = null;

  for (let index = commitTrees.length; index <= commitIndex; index++) {
    // Commits are generated sequentially and cached.
    // If this is the very first commit, start with the cached snapshot and apply the first mutation.
    // Otherwise load (or generate) the previous commit and append a mutation to it.
    if (index === 0) {
      const nodes = new Map(); // Construct the initial tree.

      recursivelyInitializeTree(rootID, 0, nodes, dataForRoot); // Mutate the tree

      if (operations != null && index < operations.length) {
        commitTree = updateTree({
          nodes,
          rootID
        }, operations[index]);

        if (constants["F" /* __DEBUG__ */]) {
          __printTree(commitTree);
        }

        commitTrees.push(commitTree);
      }
    } else {
      const previousCommitTree = commitTrees[index - 1];
      commitTree = updateTree(previousCommitTree, operations[index]);

      if (constants["F" /* __DEBUG__ */]) {
        __printTree(commitTree);
      }

      commitTrees.push(commitTree);
    }
  }

  return commitTree;
}