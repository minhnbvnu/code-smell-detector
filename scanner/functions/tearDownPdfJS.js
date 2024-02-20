function tearDownPdfJS() {
  // Should produce 36788 939524096 for all runs.
  for (var i = 0; i < canvas_logs.length; ++i) {
    var log_length = canvas_logs[i].length;
    var log_hash = hash(canvas_logs[i].join(" "));
    var expected_length = 36788;
    var expected_hash = 939524096;
    if (log_length !== expected_length || log_hash !== expected_hash) {
      var message = "PdfJS produced incorrect output: " +
          "expected " + expected_length + " " + expected_hash + ", " +
          "got " + log_length + " " + log_hash;
      console.log(message + "\n");
      throw message;
    }
  }
  // Allow GC of global state.
  delete this.PDFJS;
  delete this.PdfJS_window;
}