function getFileName(version) {
  // change `v0.0.0` to `0-0-0`
  version = version.substr(1).replace(/\./g, '-')
  const FILE = `node-agent-${version}.mdx`
  return `${RELEASE_NOTES_PATH}/${FILE}`
}