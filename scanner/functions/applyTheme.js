function applyTheme(theme) {
    var themeLayer, grids, props, themeObject;

    if (theme && typeof theme === 'object' && !Object.getOwnPropertyNames(theme).length) {
        theme = null;
    }

    if (this._theme) {
        grids = [this];
        themeLayer = this._theme;
        props = this.properties;

        // If removing theme, reset props to defaults
        if (!theme) {
            // Delete (non-dynamic) grid props named in this theme, revealing defaults
            Object.keys(themeLayer).forEach(function(key) {
                if (!(key in dynamicPropertyDescriptors)) {
                    delete props[key];
                }
            });

            // Reset dynamic cosmetic props to defaults
            Object.keys(dynamicCosmetics).forEach(function(key) {
                props.var[key] = defaults[key];
            });
        }

        // Delete all own props from this grid instance's theme layer (defined by an eariler call)
        Object.keys(themeLayer).forEach(function(key) {
            delete themeLayer[key];
        });
    } else {
        grids = this.grids;
        themeLayer = defaults; // global theme layer
        theme = theme || 'default';
    }

    if (typeof theme === 'object') {
        themeObject = theme;
    } else if (!registry[theme]) {
        throw new HypergridError('Unknown theme "' + theme + '"');
    } else {
        themeObject = registry[theme];
    }

    if (themeObject) {
        // When no theme name, set it to explicit `undefined` (to mask defaults.themeName).
        if (!themeObject.themeName) {
            themeObject.themeName = undefined;
        }

        Object.keys(themeObject).forEach(function(key) {
            if (key in dynamicPropertyDescriptors) {
                if (key in dynamicCosmetics) {
                    grids.forEach(function(grid) {
                        grid.properties[key] = themeObject[key];
                    });
                } else {
                    // Dynamic properties are defined on properties layer; defining these
                    // r-values on the theme layer is ineffective so let's not allow it.
                    switch (key) {
                        case 'lineColor':
                            themeObject.gridLinesHColor = themeObject.gridLinesVColor = themeObject[key];
                            break;
                        default:
                            console.warn('Ignoring unexpected dynamic property ' + key + ' from theme object.');
                    }
                    // delete themeObject[key];
                }
            }
        });

        // No .assign() because themeName is read-only in defaults layer
        Object.defineProperties(themeLayer, Object.getOwnPropertyDescriptors(themeObject));
    }

    grids.forEach(function(grid) {
        grid.repaint();
    });

    return themeObject;
}