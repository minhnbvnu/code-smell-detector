function registerLanguage(name, language) {
    var lang = languages[name] = language(hljs);
    restoreLanguageApi(lang);
    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {aliases[alias] = name;});
    }
  }