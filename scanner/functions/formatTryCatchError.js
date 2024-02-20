function formatTryCatchError (error) {
  return {
    type: ERROR_TRY_CATHC,
    desc: error.message,
    stack: error.stack
  }
}