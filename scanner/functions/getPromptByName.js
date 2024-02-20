function getPromptByName (name) {
  if (!name) {
    return null
  }
  let prompts = readPrompts()
  let hits = prompts.filter(p => p.name.trim() === name.trim())
  if (hits && hits.length > 0) {
    return hits[0]
  } else {
    return null
  }
}