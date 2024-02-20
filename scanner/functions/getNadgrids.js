function getNadgrids(nadgrids) {
        // Format details: http://proj.maptools.org/gen_parms.html
        if (nadgrids === undefined) {
            return null;
        }
        var grids = nadgrids.split(',');
        return grids.map(parseNadgridString);
    }