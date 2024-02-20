async function validateCurrentBranch(branch) {
  try {
    const currentBranch = await git.getCurrentBranch()

    if (branch !== currentBranch) {
      console.log(
        'Current checked-out branch (%s) does not match expected (%s)',
        currentBranch,
        branch
      )
      return false
    }

    return true
  } catch (err) {
    console.error(err)
    return false
  }
}