function operateLanguageSourceToSink () {
  const languageType = localStorage.getItem('preferredLanguage')
  return languageType === 'en' ? 'Source to Sink already exists!' : 'Source to Sink 已存在！'
}