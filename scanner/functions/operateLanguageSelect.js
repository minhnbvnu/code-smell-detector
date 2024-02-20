function operateLanguageSelect (typeEn, typeZh) {
  const languageType = localStorage.getItem('preferredLanguage')
  return languageType === 'en' ? `Please select ${typeEn}` : `请选择${typeZh}`
}