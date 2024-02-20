function execChild(cb) {
      const opt = {
        stdio: 'pipe',
        env: process.env,
        cwd: path.join(__dirname, '../helpers')
      }

      const exec = process.argv[0]
      const args = [path.join(__dirname, '../helpers/environment.child.js')]
      const proc = spawn(exec, args, opt)

      proc.stdout.pipe(process.stderr)
      proc.stderr.pipe(process.stderr)

      proc.on('exit', (code) => {
        cb(code)
      })
    }