function setupPdfJS() {
  // Check for Typed Arrays support, throw error if not.
  if (!(typeof Uint8Array != "undefined" &&
    typeof Float64Array != "undefined" &&
    typeof (new Uint8Array(0)).subarray != "undefined")) {
      throw "TypedArrayUnsupported";
    }

  PdfJS_window.__resources__[pdf_file] = buffer(PdfJS_window.atob(getPDF()));
}