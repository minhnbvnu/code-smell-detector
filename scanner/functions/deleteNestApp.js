async function deleteNestApp() {
  await fsPromises.rm(APP_DIR, { recursive: true })
}