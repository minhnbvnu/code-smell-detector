function domainPartsToFuzzyForm(domainParts) {
  return domainParts.slice(1).reverse().join('.')
}