function formatMsgs (msgs) {
  if (msgs.length > 0) {
    console.error(indentLine(2, 'Messages:'.bold.blue))

    msgs.forEach(function (msg, i) {
      console.log(indentLines(4, msg))
    })

    doublespace()
  }
}