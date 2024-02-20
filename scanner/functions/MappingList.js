function MappingList() {
        this._array = [];
        this._sorted = true;
        // Serves as infimum
        this._last = { generatedLine: -1, generatedColumn: 0 };
    }