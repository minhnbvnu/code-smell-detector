function getMaxModelTokens (model = 'gpt-3.5-turbo') {
  if (model.startsWith('gpt-3.5-turbo')) {
    if (model.includes('16k')) {
      return 16000
    } else if (model.includes('0613') || model.includes('0314')) {
      return 4000
    } else {
      return 16000
    }
  } else {
    if (model.includes('32k')) {
      return 32000
    } else {
      return 16000
    }
  }
}