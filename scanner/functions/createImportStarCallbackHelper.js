function createImportStarCallbackHelper() {
                context.requestEmitHelper(importStarHelper);
                return getUnscopedHelperName("__importStar");
            }