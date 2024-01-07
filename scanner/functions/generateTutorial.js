function generateTutorial(title, tutorial, filename) {
    const tutorialData = {
      title: title,
      header: tutorial.title,
      content: tutorial.parse(),
      children: tutorial.children,
    };

    let html = view.render('tutorial.tmpl', tutorialData);
    // yes, you can use {@link} in tutorials too!
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

    const tutorialPath = path.join(outdir, filename);
    fs.writeFileSync(tutorialPath, html, 'utf8');
  }