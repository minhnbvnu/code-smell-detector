function computeExtra ({ status, signal }) {
  if (status > 0 && signal != null) {
    return green(' (code: ') + blue(status) + green(', signal: ') + blue(signal) + green(')')
  } else if (status > 0) {
    return green(' (code: ') + blue(status) + green(')')
  } else if (signal != null) {
    return green(' (signal: ') + blue(signal) + green(')')
  } else {
    return ''
  }
}