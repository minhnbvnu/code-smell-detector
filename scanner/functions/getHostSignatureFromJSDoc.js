function getHostSignatureFromJSDoc(node) {
            const host = getEffectiveJSDocHost(node);
            if (host) {
                return isPropertySignature(host) && host.type && isFunctionLike(host.type) ? host.type : isFunctionLike(host) ? host : void 0;
            }
            return void 0;
        }