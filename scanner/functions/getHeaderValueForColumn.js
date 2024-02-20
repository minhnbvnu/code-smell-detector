function getHeaderValueForColumn(columnDef) {
            if (_options.headerColumnValueExtractor) {
                var val = _options.headerColumnValueExtractor(columnDef);
                if (val) {
                    return val;
                }
            }
            return columnDef.name;
        }