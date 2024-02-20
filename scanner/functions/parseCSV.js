function parseCSV(strData, trim) {
    // Trim trailing newline
    if (strData.endsWith('\n')) {
        strData = strData.slice(0, strData.length - 1);
    }
    
    const objPattern = /(,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^,\r\n]*))/gi;
    let arrMatches = null, data = [[]];
    while (arrMatches = objPattern.exec(strData)) {
        if (arrMatches[1].length && arrMatches[1] !== ',') {
            data.push([]);
        }
        
        data[data.length - 1].push(arrMatches[2] ? 
            arrMatches[2].replace(/""/g, '"') :
            arrMatches[3]);
    }

    // Find the max array length
    let max = 0;
    for (let i = 0; i < data.length; ++i) { max = Math.max(max, data[i].length); }

    // Look for quadplay special patterns and normalize array lengths
    for (let r = 0; r < data.length; ++r) {
        const array = data[r];
        
        for (let c = 0; c < array.length; ++c) {
            let val = array[c];
            const v = /^ *[-+]?[0-9]*\.?[0-9]*([eE][-+]?\d+)?(%|deg)? *$/.test(val) ? parseFloat(val) : NaN;
            if (! isNaN(v)) {
                array[c] = v;
                val = val.trim();
                if (val.endsWith('%')) {
                    array[c] /= 100;
                } else if (val.endsWith('deg')) {
                    array[c] *= Math.PI / 180;
                }
            } else if (val && (typeof val === 'string') && (val.length > 0)) {
                // May be a special string
                if (trim) {
                    val = array[c] = array[c].trim();
                }

                switch (val) {
                case 'infinity': case '+infinity':
                    array[c] = Infinity;
                    break;
                    
                case '-infinity':
                    array[c] = -Infinity;
                    break;
                    
                case 'nil': case 'null':
                    array[c] = undefined;
                    break;
                    
                case 'NaN': case 'nan':
                    array[c] = NaN;
                    break;
                    
                case 'TRUE': case 'true':
                    array[c] = true;
                    break;
                    
                case 'FALSE': case 'false':
                    array[c] = false;
                    break;
                
                default:
                    if (/^[\$¥€£§][+\-0-9\.e]+$/.test(val)) {
                        array[c] = parseFloat(val.substring(1));
                    }                       
                } // switch
            } // nonempty string
        } // for each column
        
        if (array.length < max) {
            const old = array.length;
            array.length = max;
            array.fill(old, max, '');
        }
    }

    return data;
}