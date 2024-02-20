function operateLanguageSuccessMessage (languageTextTemp, action) {
  const languageType = localStorage.getItem('preferredLanguage')
  let languageText = ''
  if (action === 'create') {
    languageText = languageType === 'en' ? `${languageTextTemp} is created successfully!` : `${languageTextTemp} 添加成功！`
  } else if (action === 'modify') {
    languageText = languageType === 'en' ? `${languageTextTemp} is modified successfully!` : `${languageTextTemp} 修改成功！`
  } else if (action === 'copy') {
    languageText = languageType === 'en' ? `${languageTextTemp} is copid successfully!` : `${languageTextTemp} 复制成功！`
  } else if (action === 'existed') {
    languageText = languageType === 'en' ? `This ${languageTextTemp} has been created!` : `该 ${languageTextTemp} 已被创建！`
  }
  return languageText
}