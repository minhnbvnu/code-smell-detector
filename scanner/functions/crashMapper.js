function crashMapper (d) {
  if (d.message.indexOf(3) >= 0) {
    // cause a crash
    let str = JSON.stringify(d)
    str = str.concat('asdf')
    const no = JSON.parse(str)
    return no
  } else {
    d.message = d.message.toUpperCase()

    return d
  }
}