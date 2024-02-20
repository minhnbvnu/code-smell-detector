function addTranslations() {
    return new Promise(function (resolve, reject) {
        fs.readFile(global.config.public_http + '/src/translations/translations.json', function readTranslations(err, translations) {
            if (err) {
                return reject(err);
            }

            try {
                translations = JSON.parse(translations);
            } catch (e) {
                return reject(e);
            }

            fs.readdir(global.config.public_http + '/src/translations/', function readTranslationFile(err, pofiles) {
                var trans = [];

                if (err) {
                    return reject(err);
                }

                pofiles.forEach(function (file) {
                    var locale = file.slice(0, -3);
                    if ((file.slice(-3) === '.po') && (locale !== 'template')) {
                        trans.push({tag: locale, language: translations[locale]});
                    }
                });

                resolve(trans);
            });
        });
    });
}