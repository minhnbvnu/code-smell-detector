async function downloadBase64File(filename, data) {
  const res = await fetch(data)
  const blob = await res.blob()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
}