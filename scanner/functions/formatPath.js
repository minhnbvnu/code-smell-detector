function formatPath(fullPath) {
  const relativePath = path.relative(process.cwd(), fullPath)

  return `${path.dirname(relativePath)}/${PATH_HIGHLIGHT_COLOR(
    path.basename(relativePath)
  )}`
}