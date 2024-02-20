function overlayChildNodes(fromFragment, toElement) {
  for (const childNode of fromFragment.childNodes) {
    if (childNode.nodeType === childNode.TEXT_NODE) {
      // Keep the translated text node.
      continue;
    }

    if (childNode.hasAttribute("data-l10n-name")) {
      const sanitized = getNodeForNamedElement(toElement, childNode);
      fromFragment.replaceChild(sanitized, childNode);
      continue;
    }

    if (isElementAllowed(childNode)) {
      const sanitized = createSanitizedElement(childNode);
      fromFragment.replaceChild(sanitized, childNode);
      continue;
    }

    console.warn(
      `An element of forbidden type "${childNode.localName}" was found in ` +
        "the translation. Only safe text-level elements and elements with " +
        "data-l10n-name are allowed."
    );

    // If all else fails, replace the element with its text content.
    fromFragment.replaceChild(
      createTextNodeFromTextContent(childNode),
      childNode
    );
  }

  toElement.textContent = "";
  toElement.appendChild(fromFragment);
}