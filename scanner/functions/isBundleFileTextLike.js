function isBundleFileTextLike(section) {
            switch (section.kind) {
                case "text" /* Text */:
                case "internal" /* Internal */:
                    return true;
                default:
                    return false;
            }
        }