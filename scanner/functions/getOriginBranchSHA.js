function getOriginBranchSHA(fork) {
      return deleteExistingBranch(fork).then(() =>
        Promise.all([
          request(
            options(
              token,
              `https://api.github.com/repos/${
                fork.full_name
              }/git/refs/heads/master`
            )
          ),
          request(
            options(
              token,
              `https://api.github.com/repos/sketchplugins/plugin-directory/git/refs/heads/master`
            )
          ),
        ])
          .then(([originData, upstreamData]) => ({
            originSHA: JSON.parse(originData).object.sha,
            upstreamSHA: JSON.parse(upstreamData).object.sha,
          }))
          .then(({ originSHA, upstreamSHA }) => {
            if (originSHA === upstreamSHA) {
              return originSHA
            }
            // merge upstream master so that there is no conflicts
            const opts = options(
              token,
              `https://api.github.com/repos/${
                fork.full_name
              }/git/refs/heads/master`,
              'PATCH'
            )
            opts.json = {
              sha: upstreamSHA,
            }
            return request(opts).then(() => upstreamSHA)
          })
          .then(headSHA => {
            const opts = options(
              token,
              `https://api.github.com/repos/${fork.full_name}/git/refs`,
              'POST'
            )
            opts.json = {
              ref: `refs/heads/${repo}`,
              sha: headSHA,
            }
            return request(opts)
          })
          .then(() =>
            // now we just need to get the SHA of the file in the branch
            request(
              options(
                token,
                `https://api.github.com/repos/${
                  fork.full_name
                }/contents/plugins.json?ref=${repo}`
              )
            ).then(data => JSON.parse(data).sha)
          )
      )
    }