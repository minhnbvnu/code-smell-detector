function buildPages() {
  navbar.forEach(navItem => {
    navItem.selected = false;
  });

  return gulp
    .src('docs/pages/*.js')
    .pipe(
      livingcss('docs', {
        loadcss: false,
        template: 'docs/template/template.hbs',
        tags: { ...tags },
        preprocess: function (context, template, Handlebars) {
          context.navbar = navbar;
          context.otherSections = context.sections.slice(1);
          context['nav-' + context.id] = true;

          context.sections.forEach(section => {
            buildImports(section);
          });

          // load all handlebar partials
          return livingcss.utils.readFileGlobs(
            'docs/template/partials/*.hbs',
            function (data, file) {
              // make the name of the partial the name of the file
              var partialName = path.basename(file, path.extname(file));
              Handlebars.registerPartial(partialName, data);
            }
          );
        }
      })
    )
    .pipe(gulp.dest('docs'));
}