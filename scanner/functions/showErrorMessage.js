function showErrorMessage(msg, error) {
  console.error("ERROR: " + msg)
  console.log("ERROR: " + msg)
  if (error) {
    console.error(error.toString())
    console.log(error)
  }
}