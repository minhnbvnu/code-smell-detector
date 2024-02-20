function getMappedLocation(location, sourceMapper, fileExists) {
            const mapsTo = sourceMapper.tryGetSourcePosition(location);
            return mapsTo && (!fileExists || fileExists(normalizePath(mapsTo.fileName)) ? mapsTo : void 0);
        }