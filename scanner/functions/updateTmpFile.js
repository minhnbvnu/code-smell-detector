async function updateTmpFile (data) {
  try {
    await mkdir(dirname(CACHE_FILE_PATH), { recursive: true })
    await writeFile(CACHE_FILE_PATH, JSON.stringify(data), { encoding: 'utf-8', flag: 'w+' })
  } catch (error) {
    console.error('Error writing cache.', error)
  }
}