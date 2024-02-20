function applyGeneratedPreparationClasses(element, event, options) {
  var classes = '';
  if (event) {
    classes = pendClasses(event, EVENT_CLASS_PREFIX, true);
  }
  if (options.addClass) {
    classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX));
  }
  if (options.removeClass) {
    classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX));
  }
  if (classes.length) {
    options.preparationClasses = classes;
    element.addClass(classes);
  }
}