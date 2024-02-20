async function getProcInfo(procPath) {
  try {
    return await readProc(procPath)
  } catch (err) {
    // swallow the error if reading fails, logging handled in readProc()
    return null
  }
}