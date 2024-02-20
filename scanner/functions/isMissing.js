function isMissing(argv) {
  const out = []

  const ask = (name, message, val) => {
    const type = val === undefined ? 'input' : 'confirm'
    out.push({ name, message, type, default: val })
  }

  // Required data
  !argv.dest && ask('dest', 'Directory to create the app')
  // Extra data / flags
  !argv.name && ask('name', "The plugin's name")
  !argv.force &&
    ask('force', 'Enforce `dest` directory; will overwrite!', false)
  ask('install', 'Install dependencies', true) // defaults `true`, ask anyway
  !argv.git && ask('git', 'Initialize a `git` repository', false) // defaults `true`, ask anyway

  return out
}