function operateLanguageText (resultType, actionType) {
  const languageType = localStorage.getItem('preferredLanguage')
  let languageTextEnTemp = ''
  let languageTextZhTemp = ''
  switch (actionType) {
    case 'delete':
      languageTextEnTemp = 'Delete'
      languageTextZhTemp = '删除'
      break
    case 'modify':
      languageTextEnTemp = 'Modify'
      languageTextZhTemp = '修改'
      break
  }
  let languageText = ''
  if (resultType === 'success') {
    languageText = languageType === 'en' ? `${languageTextEnTemp} successfully！` : `${languageTextZhTemp}成功！`
  } else {
    languageText = languageType === 'en' ? `Failed to ${resultType}:` : `${languageTextZhTemp}失败：`
  }
  return languageText
}