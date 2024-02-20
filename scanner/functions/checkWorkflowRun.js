async function checkWorkflowRun(repoOwner, repo, branch, workflows) {
  const github = new Github(repoOwner, repo)

  try {
    const successfulWorfklowRuns = await filterAsync(
      workflows,
      async function filterWorkflow(workflow) {
        const latestRun = await github.getLatestWorkflowRun(workflow, branch)
        if (latestRun === undefined) {
          console.log('No ci workflow run found.')
          return false
        }
        console.log(`${workflow} run details: ${JSON.stringify(formatRun(latestRun))}`)
        return latestRun.status === 'completed' && latestRun.conclusion === 'success'
      }
    )

    if (successfulWorfklowRuns.length === workflows.length) {
      console.log(SUCCESS_MSG)
      console.log(`${workflows.join(', ')} were successful!`)
      return true
    }

    return false
  } catch (err) {
    console.error(err)

    return false
  }
}