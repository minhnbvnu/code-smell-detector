function markup (text,opt) {
    options = opt
    names = options.names
    var lines = text.replace(/\\\n/,' ').split(/\n/)
    var expand = lines.map(render).join("\n")
    return expand + complete('')
  }