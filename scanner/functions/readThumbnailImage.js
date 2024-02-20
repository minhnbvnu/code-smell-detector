function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd) {
        // get the IFD1 offset
        var IFD1OffsetPointer = getNextIFDOffset(
            dataView,
            tiffStart + firstIFDOffset,
            bigEnd
        );

        if (!IFD1OffsetPointer) {
            // console.log('******** IFD1Offset is empty, image thumb not found ********');
            return {};
        } else if (IFD1OffsetPointer > dataView.byteLength) {
            // this should not happen
            // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
            return {};
        }
        // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);

        var thumbTags = readTags(
            dataView,
            tiffStart,
            tiffStart + IFD1OffsetPointer,
            IFD1Tags,
            bigEnd
        );

        // EXIF 2.3 specification for JPEG format thumbnail

        // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
        // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
        // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
        // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
        // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

        if (thumbTags['Compression']) {
            // console.log('Thumbnail image found!');

            switch (thumbTags['Compression']) {
                case 6:
                    // console.log('Thumbnail image format is JPEG');
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                        // extract the thumbnail
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob(
                            [new Uint8Array(dataView.buffer, tOffset, tLength)],
                            {
                                type: 'image/jpeg',
                            }
                        );
                    }
                    break;

                case 1:
                    console.log(
                        'Thumbnail image format is TIFF, which is not implemented.'
                    );
                    break;
                default:
                    console.log(
                        "Unknown thumbnail image format '%s'",
                        thumbTags['Compression']
                    );
            }
        } else if (thumbTags['PhotometricInterpretation'] == 2) {
            console.log(
                'Thumbnail image format is RGB, which is not implemented.'
            );
        }
        return thumbTags;
    }