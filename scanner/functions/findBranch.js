async function findBranch(branch) {
    const { branches } = await git.branch();
    return Object.keys(branches).find(_branch => _branch.indexOf(branch) > -1);
  }