function useLanguage (lang) {
  if (!lang) return languages[CN]

  const key = String(lang).toLowerCase()

  if (key in languages) return languages[key]

  return languages[CN]
}