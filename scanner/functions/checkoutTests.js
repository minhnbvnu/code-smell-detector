async function checkoutTests() {
  // Run in context of the folder this script lives in
  process.chdir(__dirname)

  await createNewTestFolder()

  process.chdir(`./${TEMP_TESTS_FOLDER}`)

  for await (const item of repos) {
    const additionalFiles = item.additionalFiles || []
    const checkoutFiles = [...additionalFiles, ...CHECKOUT_FOLDERS]

    await sparseCloneRepo(item, checkoutFiles)
  }
}