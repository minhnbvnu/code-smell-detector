async function execPipe (name, args = []) {
  console.error(blue('[ run cmd ]  ' + [name, ...args].join(' ')))
  const result = await promisify(cp.execFile)(name, args, { stdio: ['inherit', 'pipe', 'inherit'] })
  return result.stdout
}