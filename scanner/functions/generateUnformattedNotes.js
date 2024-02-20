function generateUnformattedNotes(originalNotes) {
  let unformattedNotes = originalNotes

  // Drop extra snyk details and just keep high-level summary.
  if (originalNotes.indexOf('snyk:metadata') >= 0) {
    const snykParts = originalNotes.split('<hr/>')
    const { 0: snykDescription } = snykParts

    unformattedNotes = snykDescription.trim()
  }

  return ['--- NOTES NEEDS REVIEW ---', unformattedNotes, '--------------------------'].join('\n')
}