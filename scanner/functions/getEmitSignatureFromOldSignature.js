function getEmitSignatureFromOldSignature(options, oldOptions, oldEmitSignature) {
            return !!options.declarationMap === !!oldOptions.declarationMap ? (
            // Use same format of signature
            oldEmitSignature) : (
            // Convert to different format
            isString(oldEmitSignature) ? [oldEmitSignature] : oldEmitSignature[0]);
        }