async function createNewTestFolder() {
  if (existsSync(TEMP_TESTS_FOLDER)) {
    console.log(`Removing ${TEMP_TESTS_FOLDER} folder.`)
    await rm(TEMP_TESTS_FOLDER, { recursive: true, force: true })
  }

  console.log(`Creating new ${TEMP_TESTS_FOLDER} folder.`)
  await mkdir(TEMP_TESTS_FOLDER)
}