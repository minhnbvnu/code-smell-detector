async function updatePackage (resolved, target) {
      console.log(green('Updating "version" field in ') + blue(target))
      const pkg = JSON.parse(await fs.readFile(resolved, 'utf-8'))
      pkg.version = newVersion
      fs.writeFile(resolved, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')
    }