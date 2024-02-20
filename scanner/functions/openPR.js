function openPR({ fork }) {
      const prOptions = options(
        token,
        'https://api.github.com/repos/sketchplugins/plugin-directory/pulls',
        'POST'
      )
      prOptions.json = {
        title: `Add the ${repo} plugin`,
        head: `${fork.owner.login}:${repo}`,
        body: `Hello Team :wave:

The plugin is [here](${skpmConfig.homepage ||
          `https://github.com/${repo}`}) if you want to have a look.

Hope you are having a great day :)
`,
        base: 'master',
        maintainer_can_modify: true,
      }
      return request(prOptions)
    }