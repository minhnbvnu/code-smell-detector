function getJSExtensionForFile(fileName, options) {
            var _a2;
            return (_a2 = tryGetJSExtensionForFile(fileName, options)) != null ? _a2 : Debug.fail(`Extension ${extensionFromPath(fileName)} is unsupported:: FileName:: ${fileName}`);
        }