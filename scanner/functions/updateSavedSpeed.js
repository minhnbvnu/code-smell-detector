function updateSavedSpeed(newSpeed) {
  safeCreateDirectory(CONFIG_DIRECTORY)
  safeCreateDirectory(WIPECLEAN_CONFIG_DIRECTORY)
  try {
    writeFileSync(CONFIG_FILE, JSON.stringify({ speed: newSpeed }))
    console.log(`Updated brush speed to ${newSpeed} fps.`)
  } catch (e) {
    console.log('Failed to update brush speed:', e)
  }
}