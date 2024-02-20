function loadCSV(csvURL, definition, outputObject, outputField, callback) {
    const arrayOutput = definition.type === 'array';
    
    console.assert(definition.type === 'csv' || arrayOutput);
    console.assert(outputObject);
    
    loadManager.fetch(csvURL, 'text', null, function (csv) {
        // Parse cells
        let grid = parseCSV(csv, definition.trim !== false);

        // By parseCSV returns row-major data and tables in quadplay
        // default to column major, so transpose the CSV parse
        // oppositely to the transpose flag.
        if (! definition.transpose) {
            grid = transposeGrid(grid);
        }

        const row_type = arrayOutput ? 'array' : (definition.transpose ? definition.column_type : definition.row_type) || 'object';
        const col_type = arrayOutput ? 'array' : (definition.transpose ? definition.row_type : definition.column_type) || 'object';

        if (! arrayOutput && (definition.ignore_first_row || (definition.ignore_first_column && definition.transpose))) {
            // Remove the first row of each column
            for (let x = 0; x < grid.length; ++x) {
                grid[x].shift();
            }
        }
        
        if (! arrayOutput && (definition.ignore_first_column || (definition.ignore_first_row && definition.transpose))) {
            // Remove the first column
            grid.shift();
        }
        
        // Parse table
        let data;
        
        if ((col_type === 'array') && (row_type === 'array')) {
            // This is the data structure that we already have
            // in memory
            data = grid;
        } else {
            if (row_type === 'object') {
                data = {};
                if (col_type === 'object') {
                    // Object of objects
                    for (let c = 1; c < grid.length; ++c) {
                        const dst = data[grid[c][0]] = {};
                        const src = grid[c];
                        for (let r = 1; r < grid[0].length; ++r) {
                            dst[grid[0][r]] = src[r];
                        }
                    } // for each column (key)
                    
                } else { // row_type == 'array'
                    
                    // Object of arrays. The first row contains the object property names
                    for (let c = 0; c < grid.length; ++c) {
                        data[grid[c][0]] = grid[c].slice(1);
                    } // for each column (key)
                }
            } else {
                // Array of objects. The first column contains the object property names
                data = new Array(grid.length - 1);
                for (let c = 0; c < data.length; ++c) {
                    const src = grid[c + 1];
                    const dst = data[c] = {};
                    for (let r = 0; r < src.length; ++r) {
                        dst[grid[0][r]] = grid[c + 1][r];
                    } // for row
                } // for col
            } // array of objects
        }

        if (definition.type === 'array') {
            // Convert to a single flat array
            const old = data;
            data = new Array();
            for (const a of old) {
                for (const v of a) {
                    data.push(v);
                }
            }
        }

        outputObject[outputField] = data;
        if (callback) { callback(); }
    });
}