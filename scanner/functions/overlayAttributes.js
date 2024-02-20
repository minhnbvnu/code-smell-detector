function overlayAttributes(fromElement, toElement) {
  const explicitlyAllowed = toElement.hasAttribute("data-l10n-attrs")
    ? toElement
        .getAttribute("data-l10n-attrs")
        .split(",")
        .map(i => i.trim())
    : null;

  // Remove existing localizable attributes if they
  // will not be used in the new translation.
  for (const attr of Array.from(toElement.attributes)) {
    if (
      isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed) &&
      !hasAttribute(fromElement.attributes, attr.name)
    ) {
      toElement.removeAttribute(attr.name);
    }
  }

  // fromElement might be a {value, attributes} object as returned by
  // Localization.messageFromBundle. In which case attributes may be null to
  // save GC cycles.
  if (!fromElement.attributes) {
    return;
  }

  // Set localizable attributes.
  for (const attr of Array.from(fromElement.attributes)) {
    if (
      isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed) &&
      toElement.getAttribute(attr.name) !== attr.value
    ) {
      toElement.setAttribute(attr.name, attr.value);
    }
  }
}