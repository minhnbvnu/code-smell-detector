function readGridNodes(view, offset, gridHeader, isLittleEndian) {
        var nodesOffset = offset + 176;
        var gridRecordLength = 16;
        var gridShiftRecords = [];
        for (var i = 0; i < gridHeader.gridNodeCount; i++) {
            var record = {
                latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
                longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian),
                latitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian),
                longitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian),
            };
            gridShiftRecords.push(record);
        }
        return gridShiftRecords;
    }