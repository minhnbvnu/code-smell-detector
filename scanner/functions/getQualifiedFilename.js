function getQualifiedFilename(separator) {
                if (separator && path && path.substr(-1) !== separator && filename.substr(0) !== separator) {
                    return path + separator + filename;
                }
                return path + filename;
            }