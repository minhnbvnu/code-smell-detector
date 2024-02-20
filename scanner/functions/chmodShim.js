function chmodShim (to, {createCmdFile, createPwshFile}) {
  return Promise.all([
    fs.chmod(to, 0o755),
    createPwshFile && fs.chmod(`${to}.ps1`, 0o755),
    createCmdFile && fs.chmod(`${to}.cmd`, 0o755)
  ])
}