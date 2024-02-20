function loadNotes(rule) {
  let textToReturn = ''
  let noteValue = ''
  if (rule.meta.docs.notes) {
    textToReturn = `### Notes\n`
    for (let i = 0; i < rule.meta.docs.notes.length; i++) {
      noteValue = rule.meta.docs.notes[i].note
      textToReturn = textToReturn + `- ${noteValue}\n`
    }
  }

  return textToReturn
}