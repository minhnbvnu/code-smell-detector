function isSpecialParam (paramKey) {
  const key = paramKey.toLowerCase()

  return ((key === 'vars' || key === 'members' || key === 'recipient-variables') || (key.indexOf('v:') === 0))
}