function prettyPrintOne(sourceCodeHtml, opt_langExtension, opt_numberLines) {
    var container = document.createElement('PRE');
    // This could cause images to load and onload listeners to fire.
    // E.g. <img onerror="alert(1337)" src="nosuchimage.png">.
    // We assume that the inner HTML is from a trusted source.
    container.innerHTML = sourceCodeHtml;
    if (opt_numberLines) {
      numberLines(container, opt_numberLines);
    }

    var job = {
      langExtension: opt_langExtension,
      numberLines: opt_numberLines,
      sourceNode: container
    };
    applyDecorator(job);
    return container.innerHTML;
  }