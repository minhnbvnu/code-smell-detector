function nadgrid(key, data) {
        var view = new DataView(data);
        var isLittleEndian = detectLittleEndian(view);
        var header = readHeader(view, isLittleEndian);
        if (header.nSubgrids > 1) {
            console.log('Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored');
        }
        var subgrids = readSubgrids(view, header, isLittleEndian);
        var nadgrid = { header: header, subgrids: subgrids };
        loadedNadgrids[key] = nadgrid;
        return nadgrid;
    }