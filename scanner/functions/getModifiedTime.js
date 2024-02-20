function getModifiedTime(host, fileName) {
            return host.getModifiedTime(fileName) || missingFileModifiedTime;
        }