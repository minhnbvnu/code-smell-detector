function formatReleaseNotes(releaseDate, version, body, frontmatter) {
  const releaseNotesBody = [
    '---',
    'subject: Node.js agent',
    `releaseDate: '${releaseDate}'`,
    `version: ${version.substr(1)}`, // remove the `v` from start of version
    `downloadLink: 'https://www.npmjs.com/package/newrelic'`,
    `security: ${frontmatter.security}`,
    `bugs: ${frontmatter.bugfixes}`,
    `features: ${frontmatter.features}`,
    '---',
    '',
    '## Notes',
    '',
    body
  ].join('\n')

  console.log(`Release Notes Body \n${releaseNotesBody}`)
  return releaseNotesBody
}