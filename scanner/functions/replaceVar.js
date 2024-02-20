function replaceVar(block, color) {
  block.innerHTML = block.innerHTML.replace(
    /var\(\s*--theme-color.*?\)/g,
    color
  )
}