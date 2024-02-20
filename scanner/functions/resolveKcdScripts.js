function resolveKcdScripts() {
  if (
    pkg.name === 'kcd-scripts' ||
    // this happens on install of husky within kcd-scripts locally
    appDirectory.includes(path.join(__dirname, '..'))
  ) {
    return require.resolve('./').replace(process.cwd(), '.')
  }
  return resolveBin('kcd-scripts')
}