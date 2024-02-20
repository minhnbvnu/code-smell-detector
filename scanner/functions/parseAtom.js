function parseAtom () {
    return (
      parseParenthesizedExpression() ||
      parseLicenseRef() ||
      parseLicense()
    )
  }