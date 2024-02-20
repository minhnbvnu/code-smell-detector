function removeJsComments(str) {
  return (str || '')
    .replace(/\/\*[\s\S]*(?:\*\/)/g, '') //everything between '/* */'
    .replace(/\/\/[^\n\r]*/g, '') //everything after '//'
}