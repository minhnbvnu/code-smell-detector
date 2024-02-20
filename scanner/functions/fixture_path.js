function fixture_path() {
    return async(function* () {
      var app_path = yield h.copyToTmp(h.fixture_path('test-app'));

      // Expand templates
      var content, file;
      var templates = yield glob('**/*.mustache', { cwd: app_path });
      for (var i = 0; i < templates.length; i++) {
        file    = path.join(app_path, templates[i]);
        content = (yield fsAsync.readFile(file)).toString();
        content = Handlebars.compile(content)({
          default_img: config("docker:image_default")
        });
        yield fsAsync.writeFile(file, content);
      }

      return app_path;
    });
  }