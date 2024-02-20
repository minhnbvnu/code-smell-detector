function originIsExport(origin) {
            return !!(origin && origin.kind & 4 /* Export */);
        }