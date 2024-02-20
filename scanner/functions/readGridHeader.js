function readGridHeader(view, offset, isLittleEndian) {
        return {
            name: decodeString(view, offset + 8, offset + 16).trim(),
            parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
            lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
            upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
            lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
            upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
            latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
            longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
            gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
        };
    }