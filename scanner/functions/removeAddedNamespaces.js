function removeAddedNamespaces(xmlSource) {
  return xmlSource.replace(fakeNamespaceMatcher, '');
}