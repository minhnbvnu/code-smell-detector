function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log('Got file of length ' + file.byteLength);
        if (dataView.getUint8(0) != 0xff || dataView.getUint8(1) != 0xd8) {
            if (debug) console.log('Not a valid JPEG');
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xff) {
                if (debug)
                    console.log(
                        'Not a valid marker at offset ' +
                            offset +
                            ', found: ' +
                            dataView.getUint8(offset)
                    );
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log('Found 0xFFE1 marker');

                return readEXIFData(
                    dataView,
                    offset + 4,
                    dataView.getUint16(offset + 2) - 2
                );

                // offset += 2 + file.getShortAt(offset+2, true);
            } else {
                offset += 2 + dataView.getUint16(offset + 2);
            }
        }
    }