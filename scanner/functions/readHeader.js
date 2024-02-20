function readHeader(view, isLittleEndian) {
        return {
            nFields: view.getInt32(8, isLittleEndian),
            nSubgridFields: view.getInt32(24, isLittleEndian),
            nSubgrids: view.getInt32(40, isLittleEndian),
            shiftType: decodeString(view, 56, 56 + 8).trim(),
            fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
            fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
            toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
            toSemiMinorAxis: view.getFloat64(168, isLittleEndian),
        };
    }