function clearDist() {
  let cleared = false

  return {
    async buildStart() {
      if (cleared) return
      cleared = true

      try {
        if (existsSync(path.resolve('dist')))
          await fs.rm(path.resolve('dist'), { recursive: true })

        await fs.mkdir(path.resolve('dist'))
        console.log('Cleared dist/ folder.')
      } catch (error) {
        console.error('Unable to clear dist/ folder.')
        console.error(error)
      }
    }
  }
}