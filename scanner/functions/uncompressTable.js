function uncompressTable(data, tableEntry) {
	    if (tableEntry.compression === 'WOFF') {
	        var inBuffer = new Uint8Array(data.buffer, tableEntry.offset + 2, tableEntry.compressedLength - 2);
	        var outBuffer = new Uint8Array(tableEntry.length);
	        tinyInflate(inBuffer, outBuffer);
	        if (outBuffer.byteLength !== tableEntry.length) {
	            throw new Error('Decompression error: ' + tableEntry.tag + ' decompressed length doesn\'t match recorded length');
	        }

	        var view = new DataView(outBuffer.buffer, 0);
	        return {data: view, offset: 0};
	    } else {
	        return {data: data, offset: tableEntry.offset};
	    }
	}