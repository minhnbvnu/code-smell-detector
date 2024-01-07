function isAnnotationRenderable(annotation, intent) {
  return intent === "display" && annotation.viewable || intent === "print" && annotation.printable;
}