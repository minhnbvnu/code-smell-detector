function parse_FILETIME(blob){var dwLowDateTime=blob.read_shift(4),dwHighDateTime=blob.read_shift(4);return new Date((dwHighDateTime/1e7*Math.pow(2,32)+dwLowDateTime/1e7-11644473600)*1e3).toISOString().replace(/\.000/,"")}