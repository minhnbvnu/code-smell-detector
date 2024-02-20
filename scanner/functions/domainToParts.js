function domainToParts (domain) {
  try {
  return domain.split('.').reverse()
  } catch (e) {
    throw new Error(JSON.stringify(domain))
  }
}