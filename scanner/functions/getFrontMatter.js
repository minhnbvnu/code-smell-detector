async function getFrontMatter(tagName, frontMatterFile) {
  console.log(`Retrieving release notes from file: ${frontMatterFile}`)

  const version = tagName.replace('v', '')
  const data = await readReleaseNoteFile(frontMatterFile)
  const changelog = JSON.parse(data)
  const frontmatter = changelog.entries.find((entry) => entry.version === version)

  if (!frontmatter) {
    throw new Error(`Unable to find ${version} entry in ${frontMatterFile}`)
  }

  return {
    security: JSON.stringify(frontmatter.changes.security),
    bugfixes: JSON.stringify(frontmatter.changes.bugfixes),
    features: JSON.stringify(frontmatter.changes.features)
  }
}