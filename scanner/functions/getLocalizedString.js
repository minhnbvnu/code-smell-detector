function getLocalizedString(txt, subs) {
                var result = '',
                    bundle,
                    key,
                    A,
                    isValidToken = false;

                if (angular.isString(txt) && !subs && txt.indexOf(localeConf.delimiter) != -1) {
                    A = txt.split(localeConf.delimiter);
                    txt = A[0];
                    subs = angular.fromJson(A[1]);
                }

                isValidToken = isToken(txt);
                if (isValidToken) {
                    if (!angular.isObject(subs)) {
                        subs = [subs];
                    }

                    bundle = getBundle(txt);
                    if (bundle && !bundle._loading) {
                        key = getKey(txt);

                        if (bundle[key]) {
                            result = applySubstitutions(bundle[key], subs);
                        } else {
                            $log.info("[localizationService] Key not found: " + txt);
                            result = "%%KEY_NOT_FOUND%%";
                        }
                    } else {
                        if (!bundle) {
                            loadBundle(txt);
                        }
                    }
                } else {
                    result = txt;
                }

                return result;
            }