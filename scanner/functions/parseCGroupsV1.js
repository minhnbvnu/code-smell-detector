function parseCGroupsV1(info, cgroup, eachCb) {
  const target = new RegExp('^\\d+:[^:]*?\\b' + cgroup + '\\b[^:]*:')
  const lines = info.split('\n')
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i]
    if (target.test(line) && !eachCb(line.split(':')[2])) {
      break
    }
  }
}