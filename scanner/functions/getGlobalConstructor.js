function getGlobalConstructor(name, minLanguageVersion) {
                return languageVersion < minLanguageVersion ? getGlobalConstructorWithFallback(name) : factory.createIdentifier(name);
            }