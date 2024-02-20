function askUserToContinue(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(
    '\nFIX option detected. Solhint will modify your files whenever it finds a fix for a rule error. Please BACKUP your contracts first. \nContinue ? (y/n) ',
    (answer) => {
      // Close the readline interface.
      rl.close()

      // Normalize and pass the user's answer to the callback function.
      const normalizedAnswer = answer.trim().toLowerCase()
      callback(normalizedAnswer)
    }
  )
}