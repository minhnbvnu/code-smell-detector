function isPureText (filename) {
  const ext = path.extname(filename).toLowerCase()

  // List of file extensions that can be treated as pure text
  const textFileExtensions = ['.txt', '.log', '.md', '.csv', '.html', '.css', '.js', '.json', '.xml', '.py', '.java', '.cpp', '.c', '.rb', '.php', '.sql', '.sh', '.pl', '.r', '.swift', '.go', '.ts', '.htm', '.yaml', '.yml', '.ini', '.properties', '.tsv']

  // File types that require additional processing
  const processingExtensions = ['.docx', '.pptx', '.xlsx', '.pdf', '.epub']

  if (textFileExtensions.includes(ext)) {
    return 'text'
  } else if (processingExtensions.includes(ext)) {
    // Return the file extension if additional processing is needed
    return ext.replace('.', '')
  } else {
    return false
  }
}