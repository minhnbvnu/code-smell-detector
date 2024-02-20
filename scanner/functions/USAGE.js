function USAGE(message) {
  var error_code = 0;
  sys.puts("\n  USAGE: pagecount FILENAME\n\n" +
    "  Show the estimated page count of a file based on 350 words per page.\n" +
    "  FILENAME should be the name of a utf-8 encoded text file.\n" +
    "\b\n" + 
    "  Example:\n\t\tpagecount MyFile.txt\n\n  Estimates the page count of MyFile.txt\n");

  if (message !== undefined) {
    sys.puts(message);
    error_code = 1;
  }
  process.exit(error_code);
}