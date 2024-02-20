function foregroundOnAccent(reference, contrastTarget) {
  return reference.contrast(white) >= contrastTarget ? white : black;
}