function getProperty(context, propertyName, f = EMPTY_OBJECT) {
  let objectState = f;

  // Handle XVIZ v1 color override where our semantic color mapping
  // differs from current OCS colors.  In XVIZ v2 we should be aligned.
  if (context.useSemanticColor) {
    switch (propertyName) {
      case 'stroke_color':
      case 'fill_color':
        objectState = XVIZObject.get(f.id) || f;
        break;

      default:
      // ignore
    }
  }

  // Handle XVIZ v1 style property name mismatches and
  // setup validation function based on property name.
  let altPropertyName = null;

  switch (propertyName) {
    case 'stroke_color':
    case 'fill_color':
      altPropertyName = 'color';
      break;
    case 'stroke_width':
      altPropertyName = 'thickness';
      break;
    case 'radius':
      // v2 circle inline style
      if (f.radius) {
        return f.radius;
      }
      break;
    default:
      break;
  }

  // 1a. Property from inline style (v2) or stylesheet
  let property = getStylesheetProperty(context, propertyName, objectState);

  // 1b. Alt property from inline style (v2) or stylesheet
  if (property === null && altPropertyName) {
    property = getStylesheetProperty(context, altPropertyName, objectState);
  }

  // Backward compatibility
  if (property === null && !context.disableInlineStyling) {
    // 2a. Property from inline style (v1)
    property = getInlineProperty(context, propertyName, objectState);

    // 2b. Alt property from inline style (v1)
    if (property === null && altPropertyName) {
      property = getInlineProperty(context, altPropertyName, objectState);
    }
  }

  // 3. Property from default style
  if (property === null) {
    property = context.style.getPropertyDefault(propertyName);
  }

  if (propertyName === 'text_anchor' || propertyName === 'text_baseline') {
    // These XVIZ enumerations map to Deck.gl as lowercase strings
    property = property.toLowerCase();
  }

  return property;
}