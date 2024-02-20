function forkUpstream(res) {
      return request(
        options(
          token,
          'https://api.github.com/repos/sketchplugins/plugin-directory/forks',
          'POST'
        )
      )
        .then(fork => JSON.parse(fork))
        .then(fork =>
          getOriginBranchSHA(fork).then(sha => ({
            pluginUpdate: res,
            fork,
            sha,
          }))
        )
    }