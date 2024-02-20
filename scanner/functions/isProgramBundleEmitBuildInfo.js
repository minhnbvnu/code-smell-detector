function isProgramBundleEmitBuildInfo(info) {
            return !!outFile(info.options || {});
        }