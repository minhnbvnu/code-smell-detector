function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log('Got file of length ' + file.byteLength);
        if (dataView.getUint8(0) != 0xff || dataView.getUint8(1) != 0xd8) {
            if (debug) console.log('Not a valid JPEG');
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;

        var isFieldSegmentStart = function (dataView, offset) {
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset + 1) === 0x42 &&
                dataView.getUint8(offset + 2) === 0x49 &&
                dataView.getUint8(offset + 3) === 0x4d &&
                dataView.getUint8(offset + 4) === 0x04 &&
                dataView.getUint8(offset + 5) === 0x04
            );
        };

        while (offset < length) {
            if (isFieldSegmentStart(dataView, offset)) {
                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset + 7);
                if (nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if (nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(
                    offset + 6 + nameHeaderLength
                );

                return readIPTCData(file, startOffset, sectionLength);

                break;
            }

            // Not the marker, continue searching
            offset++;
        }
    }