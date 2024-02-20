async function getReleaseNotes(tagName, releaseNotesFile) {
  console.log('Retrieving release notes from file: ', releaseNotesFile)

  const data = await readReleaseNoteFile(releaseNotesFile)

  const currentVersionHeader = `### ${tagName}`
  if (data.indexOf(currentVersionHeader) !== 0) {
    throw new Error(`Current tag (${currentVersionHeader}) not first line of release notes.`)
  }

  const sections = data.split(/^### /m, 2)
  if (sections.length !== 2) {
    throw new Error('Did not split into multiple sections. Double check notes format.')
  }

  const tagSection = sections[1]
  // e.g. v7.1.2 (2021-02-24)\n\n
  const headingRegex = /^v\d+\.\d+\.\d+ \(\d{4}-\d{2}-\d{2}\)\n\n/
  const headingRemoved = tagSection.replace(headingRegex, '')

  return headingRemoved + SUPPORT_STATEMENT
}