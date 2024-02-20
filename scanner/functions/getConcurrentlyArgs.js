function getConcurrentlyArgs(scripts, {killOthers = true} = {}) {
  const colors = [
    'bgBlue',
    'bgGreen',
    'bgMagenta',
    'bgCyan',
    'bgWhite',
    'bgRed',
    'bgBlack',
    'bgYellow',
  ]
  scripts = Object.entries(scripts).reduce((all, [name, script]) => {
    if (script) {
      all[name] = script
    }
    return all
  }, {})
  const prefixColors = Object.keys(scripts)
    .reduce(
      (pColors, _s, i) =>
        pColors.concat([`${colors[i % colors.length]}.bold.white`]),
      [],
    )
    .join(',')

  // prettier-ignore
  return [
    killOthers ? '--kill-others-on-fail' : null,
    '--prefix', '[{name}]',
    '--names', Object.keys(scripts).join(','),
    '--prefix-colors', prefixColors,
    ...Object.values(scripts).map(s => JSON.stringify(s)), // stringify escapes quotes ✨
  ].filter(Boolean)
}