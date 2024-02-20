function load_haml(scope) {
      fs.readFile(haml_file, "utf8", function (err, haml) {
        fs.readFile(base + ".html", "utf8", function (err, expected) {
          compare(haml_file, haml, expected, scope)
        });
      });
    }