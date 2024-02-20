function operateLanguageSinkConfig (languageTextTemp) {
  const languageType = localStorage.getItem('preferredLanguage')
  const languageText = languageType === 'en' ? `${languageTextTemp} Config should be JSON format! ` : `${languageTextTemp} Config 必须为 JSON格式！`
  return languageText
}