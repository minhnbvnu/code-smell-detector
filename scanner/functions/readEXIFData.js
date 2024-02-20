function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != 'Exif') {
            if (debug)
                console.log(
                    'Not valid EXIF data! ' + getStringFromDB(file, start, 4)
                );
            return false;
        }

        var bigEnd,
            tags,
            tag,
            exifData,
            gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4d4d) {
            bigEnd = true;
        } else {
            if (debug)
                console.log('Not valid TIFF data! (no 0x4949 or 0x4D4D)');
            return false;
        }

        if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002a) {
            if (debug) console.log('Not valid TIFF data! (no 0x002A)');
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug)
                console.log(
                    'Not valid TIFF data! (First offset less than 8)',
                    file.getUint32(tiffOffset + 4, !bigEnd)
                );
            return false;
        }

        tags = readTags(
            file,
            tiffOffset,
            tiffOffset + firstIFDOffset,
            TiffTags,
            bigEnd
        );

        if (tags.ExifIFDPointer) {
            exifData = readTags(
                file,
                tiffOffset,
                tiffOffset + tags.ExifIFDPointer,
                ExifTags,
                bigEnd
            );
            for (tag in exifData) {
                switch (tag) {
                    case 'LightSource':
                    case 'Flash':
                    case 'MeteringMode':
                    case 'ExposureProgram':
                    case 'SensingMethod':
                    case 'SceneCaptureType':
                    case 'SceneType':
                    case 'CustomRendered':
                    case 'WhiteBalance':
                    case 'GainControl':
                    case 'Contrast':
                    case 'Saturation':
                    case 'Sharpness':
                    case 'SubjectDistanceRange':
                    case 'FileSource':
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case 'ExifVersion':
                    case 'FlashpixVersion':
                        exifData[tag] = String.fromCharCode(
                            exifData[tag][0],
                            exifData[tag][1],
                            exifData[tag][2],
                            exifData[tag][3]
                        );
                        break;

                    case 'ComponentsConfiguration':
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(
                file,
                tiffOffset,
                tiffOffset + tags.GPSInfoIFDPointer,
                GPSTags,
                bigEnd
            );
            for (tag in gpsData) {
                switch (tag) {
                    case 'GPSVersionID':
                        gpsData[tag] =
                            gpsData[tag][0] +
                            '.' +
                            gpsData[tag][1] +
                            '.' +
                            gpsData[tag][2] +
                            '.' +
                            gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        // extract thumbnail
        tags['thumbnail'] = readThumbnailImage(
            file,
            tiffOffset,
            firstIFDOffset,
            bigEnd
        );

        return tags;
    }