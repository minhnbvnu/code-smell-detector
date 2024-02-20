async function loadInstance () {
  const probot = new Probot({
    appId: 1,
    privateKey: 'test',
    githubToken: 'test',
    Octokit: ProbotOctokit.defaults({
      retry: { enabled: false },
      throttle: { enabled: false }
    })
  })
  await probot.load(settingsBot)

  return probot
}