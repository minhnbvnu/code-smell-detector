function packageIdToString(packageId) {
            return `${packageIdToPackageName(packageId)}@${packageId.version}`;
        }