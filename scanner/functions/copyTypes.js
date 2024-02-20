function copyTypes() {
  let copied = false
  return {
    async buildEnd() {
      if (copied) return
      copied = true

      for (const build of ['react', 'core']) {
        console.log(
          `./${build}/index.d.ts → ./dist/${build}.d.ts, ./dist/${build}.es.d.ts, ./dist/${build}.umd.d.ts`
        )
        for (const infix of ['', '.es', '.umd']) {
          try {
            await fs.copyFile(
              path.join(process.cwd(), build, 'index.d.ts'),
              path.join(process.cwd(), 'dist', `${build}${infix}.d.ts`)
            )
          } catch (error) {
            console.log(
              `Unable to copy ./${build}/index.d.ts to ./dist/${build}${infix}.d.ts`
            )
            console.error(error)
          }
        }
      }
    }
  }
}