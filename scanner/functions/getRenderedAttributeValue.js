function getRenderedAttributeValue(
  react,
  renderer,
  serverRenderer,
  attribute,
  type
) {
  const originalConsoleError = console.error;
  console.error = warn;

  const containerTagName = attribute.containerTagName || 'div';
  const tagName = attribute.tagName || 'div';

  function createContainer() {
    if (containerTagName === 'svg') {
      return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    } else if (containerTagName === 'document') {
      return document.implementation.createHTMLDocument('');
    } else if (containerTagName === 'head') {
      return document.implementation.createHTMLDocument('').head;
    } else {
      return document.createElement(containerTagName);
    }
  }

  const read = attribute.read;
  let testValue = type.testValue;
  if (attribute.overrideStringValue !== undefined) {
    switch (type.name) {
      case 'string':
        testValue = attribute.overrideStringValue;
        break;
      case 'array with string':
        testValue = [attribute.overrideStringValue];
        break;
      default:
        break;
    }
  }
  let baseProps = {
    ...attribute.extraProps,
  };
  if (attribute.type) {
    baseProps.type = attribute.type;
  }
  const props = {
    ...baseProps,
    [attribute.name]: testValue,
  };

  let defaultValue;
  let canonicalDefaultValue;
  let result;
  let canonicalResult;
  let ssrResult;
  let canonicalSsrResult;
  let didWarn;
  let didError;
  let ssrDidWarn;
  let ssrDidError;

  _didWarn = false;
  try {
    let container = createContainer();
    renderer.render(react.createElement(tagName, baseProps), container);
    defaultValue = read(container.lastChild);
    canonicalDefaultValue = getCanonicalizedValue(defaultValue);

    container = createContainer();
    renderer.render(react.createElement(tagName, props), container);
    result = read(container.lastChild);
    canonicalResult = getCanonicalizedValue(result);
    didWarn = _didWarn;
    didError = false;
  } catch (error) {
    result = null;
    didWarn = _didWarn;
    didError = true;
  }

  _didWarn = false;
  let hasTagMismatch = false;
  let hasUnknownElement = false;
  try {
    let container;
    if (containerTagName === 'document') {
      const html = serverRenderer.renderToString(
        react.createElement(tagName, props)
      );
      container = createContainer();
      container.innerHTML = html;
    } else if (containerTagName === 'head') {
      const html = serverRenderer.renderToString(
        react.createElement(tagName, props)
      );
      container = createContainer();
      container.innerHTML = html;
    } else {
      const html = serverRenderer.renderToString(
        react.createElement(
          containerTagName,
          null,
          react.createElement(tagName, props)
        )
      );
      const outerContainer = document.createElement('div');
      outerContainer.innerHTML = html;
      container = outerContainer.firstChild;
    }

    if (
      !container.lastChild ||
      container.lastChild.tagName.toLowerCase() !== tagName.toLowerCase()
    ) {
      hasTagMismatch = true;
    }

    if (
      container.lastChild instanceof HTMLUnknownElement &&
      !UNKNOWN_HTML_TAGS.has(container.lastChild.tagName.toLowerCase())
    ) {
      hasUnknownElement = true;
    }

    ssrResult = read(container.lastChild);
    canonicalSsrResult = getCanonicalizedValue(ssrResult);
    ssrDidWarn = _didWarn;
    ssrDidError = false;
  } catch (error) {
    ssrResult = null;
    ssrDidWarn = _didWarn;
    ssrDidError = true;
  }

  console.error = originalConsoleError;

  if (hasTagMismatch) {
    throw new Error('Tag mismatch. Expected: ' + tagName);
  }
  if (hasUnknownElement) {
    throw new Error('Unexpected unknown element: ' + tagName);
  }

  let ssrHasSameBehavior;
  let ssrHasSameBehaviorExceptWarnings;
  if (didError && ssrDidError) {
    ssrHasSameBehavior = true;
  } else if (!didError && !ssrDidError) {
    if (canonicalResult === canonicalSsrResult) {
      ssrHasSameBehaviorExceptWarnings = true;
      ssrHasSameBehavior = didWarn === ssrDidWarn;
    }
    ssrHasSameBehavior =
      didWarn === ssrDidWarn && canonicalResult === canonicalSsrResult;
  } else {
    ssrHasSameBehavior = false;
  }

  return {
    tagName,
    containerTagName,
    testValue,
    defaultValue,
    result,
    canonicalResult,
    canonicalDefaultValue,
    didWarn,
    didError,
    ssrResult,
    canonicalSsrResult,
    ssrDidWarn,
    ssrDidError,
    ssrHasSameBehavior,
    ssrHasSameBehaviorExceptWarnings,
  };
}