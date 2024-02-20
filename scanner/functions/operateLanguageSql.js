function operateLanguageSql (type) {
  const languageType = localStorage.getItem('preferredLanguage')
  let languageText = ''
  switch (type) {
    case 'fillIn':
      languageText = languageType === 'en' ? 'Please fill in sql' : '请填写 SQL！'
      break
    case 'className':
      languageText = languageType === 'en'
        ? 'ClassName ends up with at most one semicolon, which cannot exist elsewhere.'
        : 'ClassName 最多以一个分号结束，但其他地方不应有分号！'
      break
    case 'unique':
      languageText = languageType === 'en'
        ? 'SQL sentence should end up with a semicolon!'
        : 'SQL语句应以一个分号结束！'
      break
    case 'onlyOne':
      languageText = languageType === 'en'
        ? 'SQL sentence contains only one semicolon!'
        : 'SQL语句应只有一个分号！'
      break
  }
  return languageText
}