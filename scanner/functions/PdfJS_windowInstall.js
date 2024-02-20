function PdfJS_windowInstall(name, x) {
  Object.defineProperty(PdfJS_window, name, {value: x});
}