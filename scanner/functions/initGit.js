async function initGit(target) {
  const git = hasCommand('git')

  if (git) {
    const cwd = target

    await spawn('git', ['init'], { cwd })
    await spawn('git', ['add', '-A'], { cwd })

    const defaultGitUser = 'skpm-bot'
    const defaultGitEmail = 'bot@skpm.io'

    const gitUser = await getGitUser(defaultGitEmail, defaultGitUser)

    await spawn('git', ['commit', '-m', 'initial commit from skpm'], {
      cwd,
      env: {
        GIT_COMMITTER_NAME: gitUser.username,
        GIT_COMMITTER_EMAIL: gitUser.email,
        GIT_AUTHOR_NAME: defaultGitUser,
        GIT_AUTHOR_EMAIL: defaultGitEmail,
      },
    })
  } else {
    warn('Could not locate `git` binary in `$PATH`. Skipping!')
  }
}