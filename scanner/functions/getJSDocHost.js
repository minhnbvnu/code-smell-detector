function getJSDocHost(node) {
            const jsDoc = getJSDocRoot(node);
            if (!jsDoc) {
                return void 0;
            }
            const host = jsDoc.parent;
            if (host && host.jsDoc && jsDoc === lastOrUndefined(host.jsDoc)) {
                return host;
            }
        }