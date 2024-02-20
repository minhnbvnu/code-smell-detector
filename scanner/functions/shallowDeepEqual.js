function shallowDeepEqual(expect, actual, path) {

        // null value
        if (expect === null) {
            if (! (actual === null)) {
              throw 'Expected to have null but got "' + actual +'" at path "'+ path +'".';
            }

            return true;
        }

        // undefined expected value
        if (typeof expect == 'undefined') {
            if (typeof actual != 'undefined') {
              throw 'Expected to have undefined but got "' + actual +'" at path "'+ path +'".';
            }

            return true;
        }

        // scalar description
        if (/boolean|number|string/.test(typeof expect)) {
            if (expect != actual) {
                throw 'Expected to have "' + expect +'" but got "'+ actual +'" at path "'+ path +'".';
            }

            return true;
        }

        // dates
        if (expect instanceof Date) {
            if (actual instanceof Date) {
                if (expect.getTime() != actual.getTime()) {
                    throw(
                        'Expected to have date "' + expect.toISOString() + '" but got ' +
                        '"' + actual.toISOString() + '" at path "' + path + '".'
                    );
                }

            } else {
                throw(
                    'Expected to have date "' + expect.toISOString() + '" but got ' +
                    '"' + actual + '" at path "' + path + '".'
                );
            }
        }

        if (actual === null) {
            throw 'Expected to have an array/object but got null at path "' + path + '".';
        }

        // array/object description
        for (var prop in expect) {
            if (typeof actual[prop] == 'undefined' && typeof expect[prop] != 'undefined') {
                throw 'Expected "' + prop + '" field to be defined at path "' + path +  '".';
            }

            shallowDeepEqual(expect[prop], actual[prop], path + (path == '/' ? '' : '/') + prop);
        }

        return true;
    }