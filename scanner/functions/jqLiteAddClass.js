function jqLiteAddClass(element, cssClasses) {
  if (cssClasses && element.setAttribute) {
    var existingClasses = (' ' + (element.getAttribute('class') || '') + ' ')
                            .replace(/[\n\t]/g, " ");

    forEach(cssClasses.split(' '), function(cssClass) {
      cssClass = trim(cssClass);
      if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
        existingClasses += cssClass + ' ';
      }
    });

    element.setAttribute('class', trim(existingClasses));
  }
}