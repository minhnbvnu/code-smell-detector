function trimTemplateFile (template) {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(`internals/generators/route/${template}`, 'utf8').replace(/\s*$/, '')
}