function loadLocales() {
    // module locales
    Object.keys(modules).forEach(key => {
      const module = modules[key];
      const locales = module.main.locales;
      if (locales) {
        Object.keys(locales).forEach(key => {
          let locale = ebLocales[key];
          if (!locale) locale = ebLocales[key] = {};
          extend(false, locale, locales[key]);
        });
      }
    });

    /**
     * based on egg-i18n
     *
     * https://github.com/eggjs/egg-i18n/blob/master/app.js
     *
     */
    // project locales
    const localeDirs = loader.app.config.i18n.dirs;
    for (let i = 0; i < localeDirs.length; i++) {
      const dir = localeDirs[i];

      if (!fs.existsSync(dir)) {
        continue;
      }

      const names = fs.readdirSync(dir);
      for (let j = 0; j < names.length; j++) {
        const name = names[j];
        const filepath = path.join(dir, name);
        // support en_US.js => en-US.js
        const key = formatLocale(name.split('.')[0]);
        const resource = require(filepath);

        let locale = ebLocales[key];
        if (!locale) locale = ebLocales[key] = {};
        extend(false, locale, resource);
      }
    }
  }