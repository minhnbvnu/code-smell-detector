function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset,
            tag,
            i;

        for (i = 0; i < entries; i++) {
            entryOffset = dirStart + i * 12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug)
                console.log(
                    'Unknown tag: ' + file.getUint16(entryOffset, !bigEnd)
                );
            tags[tag] = readTagValue(
                file,
                entryOffset,
                tiffStart,
                dirStart,
                bigEnd
            );
        }
        return tags;
    }