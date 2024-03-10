      $translate.instant = function (translationId, interpolateParams, interpolationId, forceLanguage) {

        // we don't want to re-negotiate $uses
        var uses = (forceLanguage && forceLanguage !== $uses) ? // we don't want to re-negotiate $uses
              (negotiateLocale(forceLanguage) || forceLanguage) : $uses;

        // Detect undefined and null values to shorten the execution and prevent exceptions
        if (translationId === null || angular.isUndefined(translationId)) {
          return translationId;
        }

        // Check forceLanguage is present
        if (forceLanguage) {
          loadTranslationsIfMissing(forceLanguage);
        }

        // Duck detection: If the first argument is an array, a bunch of translations was requested.
        // The result is an object.
        if (angular.isArray(translationId)) {
          var results = {};
          for (var i = 0, c = translationId.length; i < c; i++) {
            results[translationId[i]] = $translate.instant(translationId[i], interpolateParams, interpolationId, forceLanguage);
          }
          return results;
        }

        // We discarded unacceptable values. So we just need to verify if translationId is empty String
        if (angular.isString(translationId) && translationId.length < 1) {
          return translationId;
        }

        // trim off any whitespace
        if (translationId) {
          translationId = trim.apply(translationId);
        }

        var result, possibleLangKeys = [];
        if ($preferredLanguage) {
          possibleLangKeys.push($preferredLanguage);
        }
        if (uses) {
          possibleLangKeys.push(uses);
        }
        if ($fallbackLanguage && $fallbackLanguage.length) {
          possibleLangKeys = possibleLangKeys.concat($fallbackLanguage);
        }
        for (var j = 0, d = possibleLangKeys.length; j < d; j++) {
          var possibleLangKey = possibleLangKeys[j];
          if ($translationTable[possibleLangKey]) {
            if (typeof $translationTable[possibleLangKey][translationId] !== 'undefined') {
              result = determineTranslationInstant(translationId, interpolateParams, interpolationId, uses);
            }
          }
          if (typeof result !== 'undefined') {
            break;
          }
        }

        if (!result && result !== '') {
          if ($notFoundIndicatorLeft || $notFoundIndicatorRight) {
            result = applyNotFoundIndicators(translationId);
          } else {
            // Return translation of default interpolator if not found anything.
            result = defaultInterpolator.interpolate(translationId, interpolateParams);
            if ($missingTranslationHandlerFactory && !pendingLoader) {
              result = translateByHandler(translationId, interpolateParams);
            }
          }
        }

        return result;
      };