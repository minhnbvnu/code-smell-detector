function mixinHandler(redirect, catchall) {
    function targetFor(name) {
        return hasOwn(redirect, name) ? redirect[name] : catchall;
    }

    function getMuxPropertyDescriptor(name) {
        var desc = getPropertyDescriptor(targetFor(name), name);
        if (desc)
            desc.configurable = true;
        return desc;
    }

    function getMuxPropertyNames() {
        var names1 = Object.getOwnPropertyNames(redirect).filter(function(name) {
            return name in redirect[name];
        });
        var names2 = getPropertyNames(catchall).filter(function(name) {
            return !hasOwn(redirect, name);
        });
        return names1.concat(names2);
    }

    function enumerateMux() {
        var result = Object.getOwnPropertyNames(redirect).filter(function(name) {
            return name in redirect[name];
        });
        for (name in catchall) {
            if (!hasOwn(redirect, name))
                result.push(name);
        };
        return result;
    }

    function hasMux(name) {
        return name in targetFor(name);
    }

    return {
        getOwnPropertyDescriptor: getMuxPropertyDescriptor,
        getPropertyDescriptor: getMuxPropertyDescriptor,
        getOwnPropertyNames: getMuxPropertyNames,
        defineProperty: function(name, desc) {
            Object.defineProperty(targetFor(name), name, desc);
        },
        "delete": function(name) {
            var target = targetFor(name);
            return delete target[name];
        },
        // FIXME: ha ha ha
        fix: function() { },
        has: hasMux,
        hasOwn: hasMux,
        get: function(receiver, name) {
            var target = targetFor(name);
            return target[name];
        },
        set: function(receiver, name, val) {
            var target = targetFor(name);
            target[name] = val;
            return true;
        },
        enumerate: enumerateMux,
        keys: enumerateMux
    };
}