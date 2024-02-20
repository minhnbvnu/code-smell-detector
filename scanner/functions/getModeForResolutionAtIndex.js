function getModeForResolutionAtIndex(file, index) {
            if (file.impliedNodeFormat === void 0)
                return void 0;
            return getModeForUsageLocation(file, getModuleNameStringLiteralAt(file, index));
        }