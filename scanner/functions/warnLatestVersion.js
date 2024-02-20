async function warnLatestVersion (current) {
  const res = await fetch('https://api.github.com/repos/ethereum/remix-desktop/releases/latest')
  let latest = (await res.json()).tag_name
  latest = latest.indexOf('v') === 0 ? latest.replace('v', '') : latest
  let ret = ''
  console.log(latest, current)
  if (semver.eq(latest, current)) {
    console.log('\x1b[32m%s\x1b[0m', `[INFO] you are using the latest version ${latest}`)
    ret = 'OK'
  } else if (semver.gt(latest, current)) {
    console.log('\x1b[33m%s\x1b[0m', `[WARN] latest version of remix-desktop is ${latest}, you are using ${current}`)
    console.log('\x1b[33m%s\x1b[0m', `[WARN] please download the latest version:`)
    console.log('\x1b[33m%s\x1b[0m', `[WARN] https://github.com/ethereum/remix-desktop/releases`)
    ret = 'OUTDATED'
  }
  return ret
}