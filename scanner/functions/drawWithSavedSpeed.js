function drawWithSavedSpeed() {
  const { speed } = safeReadConfig(CONFIG_FILE)
  startDrawing(speed)
}