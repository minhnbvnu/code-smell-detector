function resolvedTypeScriptOnly(resolved) {
            if (!resolved) {
                return void 0;
            }
            Debug.assert(extensionIsTS(resolved.extension));
            return { fileName: resolved.path, packageId: resolved.packageId };
        }