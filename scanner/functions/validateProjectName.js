function validateProjectName(name) {
    // TODO
    // Consider splitting project name and directory name
    // into separate fields to not restrict npm package
    // names from using / and possibly other characters.

    // Whitelist allowed characters and only accept those
    // to prevent use of characters that isn't allowed in
    // directory names.
    // Valid characters:
    //  * a-z
    //  * 0-9
    //  * underscore _
    //  * dash -
    //  * dot .
    //
    // Uppercase letters not whitelisted because it's not valid
    // in npm package names
    const whitelistRegex = /^[a-z0-9_.-]+$/;
    const isValidCharacters = whitelistRegex.test(name);
    if (!isValidCharacters && name) return;

    // Use validation function from third party library
    // to check if the name is a valid npm package name.
    // The whitelist above only makes sure that no invalid
    // characters for directory names is present in the name
    // so this is needed too because the project name is used
    // as both the directory name and in package.json
    const isValidNpmPackage = validate(name);
    if (isValidNpmPackage) {
      // All validation succeeded so we set the new project name
      setProjectName(name);
    }
  }