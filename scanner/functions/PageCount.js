function PageCount(filename) {
  fs.stat(filename, function (stat_error, stat) {
    if (stat_error) {
      USAGE("ERROR: " + filename + ", " + stat_error);
    }

    if (stat.isFile()) {
      fs.readFile(filename, 'utf8', function (read_error, content) {
        var subtotal_words = 0;
        if (read_error) {
          USAGE("ERROR: Can't read " + filename + ". " + read_error);
        }
        /* Replace all non-letter characters with a single space. */
        subtotal_words = content.replace(/\W+|\s+/gm,' ').split(' ').length;
        page_count = (subtotal_words/350);
        if (Number(page_count).toFixed(0) <= 1) {
          sys.puts(filename + "(" + subtotal_words + " words): " +
            Number(page_count * 100).toFixed(0) + "% of one page.");
        } else {
          sys.puts(filename + "(" + subtotal_words + " words):" +
            Number(page_count).toFixed(2) + " pages.");
        }
      });
    } else {
      USAGE("ERROR: " + filename + " is not a file.");
    }
  });
}