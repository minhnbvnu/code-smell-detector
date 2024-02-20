function keys_by_type(type) {
        return Object.keys(defaults).map(function (el) {
            if (defaults[el] !== null && defaults[el].constructor == type)
                return el;
        }).filter(function (el) { return el; });
    }