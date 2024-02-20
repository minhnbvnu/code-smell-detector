function updatePluginJSON({ pluginUpdate, fork, sha }) {
      const opts = options(
        token,
        `https://api.github.com/repos/${fork.full_name}/contents/plugins.json`,
        'PUT'
      )

      const plugin = {
        title: skpmConfig.title || skpmConfig.name,
        description: skpmConfig.description,
        name,
        owner,
        appcast: `https://raw.githubusercontent.com/${repo}/master/.appcast.xml`,
        homepage: skpmConfig.homepage || `https://github.com/${repo}`,
      }

      if (skpmConfig.author) {
        let { author } = skpmConfig
        if (typeof skpmConfig.author === 'string') {
          author = parseAuthor(skpmConfig.author)
        }
        plugin.author = author.name
      }

      const newPlugins = JSON.stringify(
        pluginUpdate.plugins.concat(plugin),
        null,
        2
      )
      let buf
      if (typeof Buffer.from === 'function') {
        // Node 5.10+
        buf = Buffer.from(newPlugins, 'utf-8')
      } else {
        // older Node versions
        buf = new Buffer(newPlugins, 'utf-8') // eslint-disable-line
      }
      opts.json = {
        path: 'plugins.json',
        message: `Add the ${repo} plugin`,
        committer: {
          name: 'skpm-bot',
          email: 'bot@skpm.io',
        },
        sha,
        content: buf.toString('base64'),
        branch: repo,
      }

      return request(opts).then(res => ({
        res,
        fork,
        sha,
      }))
    }