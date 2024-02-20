async function generateTypeDefs(outputDir) {
  const result = spawn.sync(
    resolveBin('typescript', {executable: 'tsc'}),
    // prettier-ignore
    [
      '--declaration',
      '--emitDeclarationOnly',
      '--noEmit', 'false',
      '--outDir', outputDir,
    ],
    {stdio: 'inherit'},
  )
  if (result.status !== 0) return result

  await cpy('**/*.d.ts', '../dist', {cwd: fromRoot('src'), parents: true})
  return result
}