function getDocumentStyle () {
  const links = document.querySelectorAll('link[rel="stylesheet"]')
  const styles = document.querySelectorAll('style')
  return Array.from(links).concat(Array.from(styles))
}