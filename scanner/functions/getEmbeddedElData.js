function getEmbeddedElData(el, name) {
        var prefix = core.config.dataAttrPrefix;
        var prefixedName = (prefix ? prefix + '-' : '') + name;
        return el.getAttribute('data-' + prefixedName) || '';
    }