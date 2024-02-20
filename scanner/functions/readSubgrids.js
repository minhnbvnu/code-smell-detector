function readSubgrids(view, header, isLittleEndian) {
        var gridOffset = 176;
        var grids = [];
        for (var i = 0; i < header.nSubgrids; i++) {
            var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
            var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian);
            var lngColumnCount = Math.round(1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval);
            var latColumnCount = Math.round(1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval);
            // Proj4 operates on radians whereas the coordinates are in seconds in the grid
            grids.push({
                ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
                del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
                lim: [lngColumnCount, latColumnCount],
                count: subHeader.gridNodeCount,
                cvs: mapNodes(nodes)
            });
        }
        return grids;
    }