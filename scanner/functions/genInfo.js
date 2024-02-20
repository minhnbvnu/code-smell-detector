function genInfo (didSucceed, operation) {
  const operationText = operation === MERGE ? 'Merge' : 'Conversion'

  if (didSucceed) {
    return {
      title: `${operationText} complete!`,
      body: getRandomElement(text.success),
      icon: `${imgPath}/success.png`
    }
  }

  return {
    title: `Oh no! ${operationText} failed.`,
    body: getRandomElement(text.failure),
    icon: `${imgPath}/failure.png`
  }
}