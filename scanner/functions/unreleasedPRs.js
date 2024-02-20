function unreleasedPRs() {
  try {
    program.parse()
    const opts = program.opts()

    if (!areEnvVarsSet(opts.dryRun)) {
      console.log(`${missingEnvVars.join(', ')} are not set.`)
      stopOnError()
    }

    const repos = opts.repos.split(',')
    const ignoredLabels = opts.ignoreLabels.split(',')

    repos.forEach(async (repo) => {
      const { prs, latestRelease } = await findMergedPRs(repo, ignoredLabels)

      let msg = null

      if (!prs.length) {
        msg = `:the-more-you-know: *${repo}* does not have any new PRs since \`${latestRelease.name}\` on *${latestRelease.published_at}*.`
      } else {
        msg = createSlackMessage(prs, latestRelease, repo)
      }

      if (opts.dryRun) {
        console.log(`Skipping slack but here are the deets\n${msg}`)
      } else {
        const app = new App({
          token,
          signingSecret
        })

        await app.client.chat.postMessage({
          channel,
          text: msg
        })
        console.log(`Posted msg to ${channel}`)
      }
    })
  } catch (err) {
    stopOnError(err)
  }
}