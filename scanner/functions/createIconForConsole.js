function createIconForConsole() {
  const img = document.createElement("img");
  img.setAttribute("src", "?__debugger__=yes&cmd=resource&f=console.png");
  img.setAttribute("title", "Open an interactive python shell in this frame");
  return img;
}