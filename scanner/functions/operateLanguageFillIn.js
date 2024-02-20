function operateLanguageFillIn (typeEn, typeZh) {
  const languageType = localStorage.getItem('preferredLanguage')
  return languageType === 'en' ? `Please fill in ${typeEn}` : `请填写${typeZh}`
}