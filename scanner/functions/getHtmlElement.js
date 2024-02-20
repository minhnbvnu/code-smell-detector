function getHtmlElement(data, objs) {
    switch (data.annotationType) {
      case AnnotationType.WIDGET:
        return getHtmlElementForTextWidgetAnnotation(data, objs);
      case AnnotationType.TEXT:
        return getHtmlElementForTextAnnotation(data);
      case AnnotationType.LINK:
        return getHtmlElementForLinkAnnotation(data);
      default:
        throw new Error('Unsupported annotationType: ' + data.annotationType);
    }
  }