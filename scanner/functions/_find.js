function _find(key, options) {
        options = options || {};
    
        var optionWithoutCount, translated
            , notFound = _getDefaultValue(key, options)
            , lngs = languages;
    
        if (!resStore) { return notFound; } // no resStore to translate from
    
        // CI mode
        if (lngs[0].toLowerCase() === 'cimode') return notFound;
    
        // passed in lng
        if (options.lngs) lngs = options.lngs;
        if (options.lng) {
            lngs = f.toLanguages(options.lng, options.fallbackLng);
    
            if (!resStore[lngs[0]]) {
                var oldAsync = o.getAsync;
                o.getAsync = false;
    
                i18n.sync.load(lngs, o, function(err, store) {
                    f.extend(resStore, store);
                    o.getAsync = oldAsync;
                });
            }
        }
    
        var ns = options.ns || o.ns.defaultNs;
        var nsseparator = options.nsseparator || o.nsseparator;
        if (key.indexOf(nsseparator) > -1) {
            var parts = key.split(nsseparator);
            ns = parts[0];
            key = parts[1];
        }
    
        if (hasContext(options)) {
            optionWithoutCount = f.extend({}, options);
            delete optionWithoutCount.context;
            optionWithoutCount.defaultValue = o.contextNotFound;
    
            var contextKey = ns + nsseparator + key + '_' + options.context;
    
            translated = translate(contextKey, optionWithoutCount);
            if (translated != o.contextNotFound) {
                return applyReplacement(translated, { context: options.context }); // apply replacement for context only
            } // else continue translation with original/nonContext key
        }
    
        if (needsPlural(options, lngs[0])) {
            optionWithoutCount = f.extend({ lngs: [lngs[0]]}, options);
            delete optionWithoutCount.count;
            optionWithoutCount._origLng = optionWithoutCount._origLng || optionWithoutCount.lng || lngs[0];
            delete optionWithoutCount.lng;
            optionWithoutCount.defaultValue = o.pluralNotFound;
    
            var pluralKey;
            if (!pluralExtensions.needsPlural(lngs[0], options.count)) {
                pluralKey = ns + nsseparator + key;
            } else {
                pluralKey = ns + nsseparator + key + o.pluralSuffix;
                var pluralExtension = pluralExtensions.get(lngs[0], options.count);
                if (pluralExtension >= 0) {
                    pluralKey = pluralKey + '_' + pluralExtension;
                } else if (pluralExtension === 1) {
                    pluralKey = ns + nsseparator + key; // singular
                }
            }
    
            translated = translate(pluralKey, optionWithoutCount);
    
            if (translated != o.pluralNotFound) {
                return applyReplacement(translated, {
                    count: options.count,
                    interpolationPrefix: options.interpolationPrefix,
                    interpolationSuffix: options.interpolationSuffix
                }); // apply replacement for count only
            } else if (lngs.length > 1) {
                // remove failed lng
                var clone = lngs.slice();
                clone.shift();
                options = f.extend(options, { lngs: clone });
                options._origLng = optionWithoutCount._origLng;
                delete options.lng;
                // retry with fallbacks
                translated = translate(ns + nsseparator + key, options);
                if (translated != o.pluralNotFound) return translated;
            } else {
                optionWithoutCount.lng = optionWithoutCount._origLng;
                delete optionWithoutCount._origLng;
                translated = translate(ns + nsseparator + key, optionWithoutCount);
    
                return applyReplacement(translated, {
                    count: options.count,
                    interpolationPrefix: options.interpolationPrefix,
                    interpolationSuffix: options.interpolationSuffix
                });
            }
        }
    
        if (needsIndefiniteArticle(options)) {
            var optionsWithoutIndef = f.extend({}, options);
            delete optionsWithoutIndef.indefinite_article;
            optionsWithoutIndef.defaultValue = o.indefiniteNotFound;
            // If we don't have a count, we want the indefinite, if we do have a count, and needsPlural is false
            var indefiniteKey = ns + nsseparator + key + (((options.count && !needsPlural(options, lngs[0])) || !options.count) ? o.indefiniteSuffix : "");
            translated = translate(indefiniteKey, optionsWithoutIndef);
            if (translated != o.indefiniteNotFound) {
                return translated;
            }
        }
    
        var found;
        var keyseparator = options.keyseparator || o.keyseparator;
        var keys = key.split(keyseparator);
        for (var i = 0, len = lngs.length; i < len; i++ ) {
            if (found !== undefined) break;
    
            var l = lngs[i];
    
            var x = 0;
            var value = resStore[l] && resStore[l][ns];
            while (keys[x]) {
                value = value && value[keys[x]];
                x++;
            }
            if (value !== undefined && (!o.showKeyIfEmpty || value !== '')) {
                var valueType = Object.prototype.toString.apply(value);
                if (typeof value === 'string') {
                    value = applyReplacement(value, options);
                    value = applyReuse(value, options);
                } else if (valueType === '[object Array]' && !o.returnObjectTrees && !options.returnObjectTrees) {
                    value = value.join('\n');
                    value = applyReplacement(value, options);
                    value = applyReuse(value, options);
                } else if (value === null && o.fallbackOnNull === true) {
                    value = undefined;
                } else if (value !== null) {
                    if (!o.returnObjectTrees && !options.returnObjectTrees) {
                        if (o.objectTreeKeyHandler && typeof o.objectTreeKeyHandler == 'function') {
                            value = o.objectTreeKeyHandler(key, value, l, ns, options);
                        } else {
                            value = 'key \'' + ns + ':' + key + ' (' + l + ')\' ' +
                                'returned an object instead of string.';
                            f.log(value);
                        }
                    } else if (valueType !== '[object Number]' && valueType !== '[object Function]' && valueType !== '[object RegExp]') {
                        var copy = (valueType === '[object Array]') ? [] : {}; // apply child translation on a copy
                        f.each(value, function(m) {
                            copy[m] = _translate(ns + nsseparator + key + keyseparator + m, options);
                        });
                        value = copy;
                    }
                }
    
                if (typeof value === 'string' && value.trim() === '' && o.fallbackOnEmpty === true)
                    value = undefined;
    
                found = value;
            }
        }
    
        if (found === undefined && !options.isFallbackLookup && (o.fallbackToDefaultNS === true || (o.fallbackNS && o.fallbackNS.length > 0))) {
            // set flag for fallback lookup - avoid recursion
            options.isFallbackLookup = true;
    
            if (o.fallbackNS.length) {
    
                for (var y = 0, lenY = o.fallbackNS.length; y < lenY; y++) {
                    found = _find(o.fallbackNS[y] + nsseparator + key, options);
    
                    if (found || (found==="" && o.fallbackOnEmpty === false)) {
                        /* compare value without namespace */
                        var foundValue = found.indexOf(nsseparator) > -1 ? found.split(nsseparator)[1] : found
                          , notFoundValue = notFound.indexOf(nsseparator) > -1 ? notFound.split(nsseparator)[1] : notFound;
    
                        if (foundValue !== notFoundValue) break;
                    }
                }
            } else {
                options.ns = o.ns.defaultNs;
                found = _find(key, options); // fallback to default NS
            }
            options.isFallbackLookup = false;
        }
    
        return found;
    }