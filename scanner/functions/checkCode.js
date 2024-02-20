function checkCode(code) {
  if (code != WALLY_OK)
    throw new Error(`libwally failed with code ${code}`)
}