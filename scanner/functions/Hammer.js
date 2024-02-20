function Hammer(element, options) {
            options = options || {};
            options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
            return new Manager(element, options);
        }