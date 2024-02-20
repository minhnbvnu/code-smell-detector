function I18n() {
  const localesPath = path.join(app.getAppPath(), 'main', 'locales')

  AVAILABLE_LOCALES.forEach(locale => {
    translations[locale] = fs.readJSONSync(
      path.join(localesPath, locale + '.json')
    )
  })

  return {
    availableLocales: AVAILABLE_LOCALES,
    locale: DEFAULT_LOCALE,
    translations: translations
  }
}