function deleteExistingBranch(fork) {
      const opts = options(
        token,
        `https://api.github.com/repos/${fork.full_name}/git/refs/heads/${repo}`,
        'DELETE'
      )
      return request(opts).catch(() => {})
    }