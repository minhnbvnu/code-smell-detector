function getTypesPackageNameToInstall(packageName, host, diagCode) {
            var _a2;
            return diagCode === errorCodeCannotFindModule ? ts_JsTyping_exports.nodeCoreModules.has(packageName) ? "@types/node" : void 0 : ((_a2 = host.isKnownTypesPackageName) == null ? void 0 : _a2.call(host, packageName)) ? getTypesPackageName(packageName) : void 0;
        }