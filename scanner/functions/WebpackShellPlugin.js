function WebpackShellPlugin(options) {
  return {
    apply(compiler) {
      compiler.hooks.beforeCompile.tapPromise('ShutdownExistingPlugin', () => {
        if (!options || !options.pluginIdentifier) {
          return Promise.resolve({ stdout: '' })
        }
        return exec(
          sketchtoolRunCommand(
            path.join(__dirname, '../../../shutdown-plugin.sketchplugin'),
            'shutdown-plugin',
            {
              ...(options.sketchVersion &&
              semver.satisfies(options.sketchVersion, '>= 45.0.0')
                ? { withoutActivating: true }
                : {}),
              context: { pluginIdentifier: options.pluginIdentifier },
              app: options.app,
            }
          ),
          {
            shell: '/bin/bash',
          }
        ).catch(() => {})
      })

      compiler.hooks.afterEmit.tapPromise('Run Sketch Command', () => {
        if (!options || !options.script) {
          return Promise.resolve()
        }

        return exec(options.script, {
          shell: '/bin/bash',
          maxBuffer: 1024 * 1000, // 1mb
        })
          .then(res => {
            if (res.stderr) {
              console.error(res.stderr)
            }
            if (res.stdout.trim().length > 0) {
              res.stdout
                .trim()
                .split('\n')
                .forEach(line => {
                  console.log(line)
                })
            }
          })
          .catch(err => {
            console.error(
              `${chalk.red(
                'error'
              )} Error while running the command after build`
            )
            console.error(err)
            throw err
          })
      })
    },
  }
}