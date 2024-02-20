function getInstallCommand(fileName, packageName) {
            return { type: "install package", file: fileName, packageName };
        }