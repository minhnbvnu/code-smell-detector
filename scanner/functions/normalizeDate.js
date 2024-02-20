function normalizeDate (value, { path }) {
  if (!value) return

  try {
    return new Date(value)
  } catch (e) {
    console.warn(`Invalid date in frontmatter at: ${path}`)
  }
}