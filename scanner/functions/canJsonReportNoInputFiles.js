function canJsonReportNoInputFiles(raw) {
            return !hasProperty(raw, "files") && !hasProperty(raw, "references");
        }