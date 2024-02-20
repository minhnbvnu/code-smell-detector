function validateTag(version, force) {
  if (force) {
    console.log('--force set. Skipping validation logic')
    return
  }

  if (!TAG_VALID_REGEX.exec(version)) {
    console.log('Tag arg invalid (%s). Valid tags in form: v#.#.# (e.g. v7.2.1)', version)
    stopOnError()
  }
}