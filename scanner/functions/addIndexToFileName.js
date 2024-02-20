function addIndexToFileName(fileName, fileNames) {
        if (fileNames === undefined) {
            return fileName;
        }
        var lastDot = fileName.lastIndexOf('.');
        var pre = fileName.substr(0, lastDot);
        var optionalExt = fileName.substr(lastDot);

        var indexMatch = '-(\\d+)';
        // Make the index match optional so we can match both 'fileName.png' and 'fileName-2.png'
        // The ?: makes it a non-capturing group.
        var optionalIndexMatch = '(?:' + indexMatch + ')?';

        var regex = new RegExp(pre + optionalIndexMatch + optionalExt);

        var highestIndex = 0;
        for (var existingFileName in fileNames) {
            var match = existingFileName.match(regex);
            var index = match[1];
            if (index === undefined) {
                index = 1;
            }
            else {
                index = parseInt(index);
            }
            if (index > highestIndex) {
                highestIndex = index;
            }
        }

        if (highestIndex > 0) {
            return pre + "-" + (highestIndex + 1) + optionalExt;
        }
        else {
            return fileName;
        }
    }