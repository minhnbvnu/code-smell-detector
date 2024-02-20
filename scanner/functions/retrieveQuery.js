function retrieveQuery(args, pkgVersion) {
  if (Array.isArray(args)) {
    const action = args[0].action
    if (RAW_COMMANDS.includes(action)) {
      return extractQueryArgs(args, pkgVersion)
    }

    // cast to string obj to attach symbol
    // this is done to tell query parser that we need to split string
    // to extract contents
    const clientMethod = new String(args[0].clientMethod)
    clientMethod[prismaModelCall] = true
    return clientMethod
  }
}