function linkToVersion(version) {
  if (version) {
    return `This rule was introduced in [Solhint ${version}](https://github.com/protofire/solhint/tree/v${version})`
  } else {
    return `This rule is introduced in the latest version.`
  }
}