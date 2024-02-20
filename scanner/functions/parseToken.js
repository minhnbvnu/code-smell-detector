function parseToken () {
    // Ordering matters
    return (
      operator() ||
      documentRef() ||
      licenseRef() ||
      identifier()
    )
  }