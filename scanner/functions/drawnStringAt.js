function drawnStringAt(x, y, str) {
  process.stdout.cursorTo(Math.round(x), Math.round(y))
  process.stdout.write(str)
}