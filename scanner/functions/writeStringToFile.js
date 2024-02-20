function writeStringToFile(data) {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')
  const second = String(now.getSeconds()).padStart(2, '0')

  const fileName = `${year}${month}${day}${hour}${minute}${second}_solhintReport.txt`

  // Remove ANSI escape codes from the data
  // eslint-disable-next-line no-control-regex
  const cleanedData = data.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '')

  try {
    fs.writeFileSync(fileName, cleanedData, 'utf-8') // Specify the encoding (UTF-16)
    // console.log('File written successfully:', fileName)
  } catch (err) {
    console.error('Error writing to file:', err)
  }
}