async function createOrCheckoutBranch(newBranch) {
    await git.fetch();
    const { branches } = await git.branch();
    const found = Object.keys(branches).find(
      branch => branch.indexOf(newBranch) > -1
    );
    found
      ? await git.checkout(found)
      : await git.checkoutLocalBranch(newBranch);

    return { found, newBranch };
  }