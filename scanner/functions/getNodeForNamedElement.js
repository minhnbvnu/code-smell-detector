function getNodeForNamedElement(sourceElement, translatedChild) {
  const childName = translatedChild.getAttribute("data-l10n-name");
  const sourceChild = sourceElement.querySelector(
    `[data-l10n-name="${childName}"]`
  );

  if (!sourceChild) {
    console.warn(`An element named "${childName}" wasn't found in the source.`);
    return createTextNodeFromTextContent(translatedChild);
  }

  if (sourceChild.localName !== translatedChild.localName) {
    console.warn(
      `An element named "${childName}" was found in the translation ` +
        `but its type ${translatedChild.localName} didn't match the ` +
        `element found in the source (${sourceChild.localName}).`
    );
    return createTextNodeFromTextContent(translatedChild);
  }

  // Remove it from sourceElement so that the translation cannot use
  // the same reference name again.
  sourceElement.removeChild(sourceChild);
  // We can't currently guarantee that a translation won't remove
  // sourceChild from the element completely, which could break the app if
  // it relies on an event handler attached to the sourceChild. Let's make
  // this limitation explicit for now by breaking the identitiy of the
  // sourceChild by cloning it. This will destroy all event handlers
  // attached to sourceChild via addEventListener and via on<name>
  // properties.
  const clone = sourceChild.cloneNode(false);
  return shallowPopulateUsing(translatedChild, clone);
}