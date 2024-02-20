function isIgnoredJsxProperty(source, sourceProp) {
                return getObjectFlags(source) & 2048 /* JsxAttributes */ && isHyphenatedJsxName(sourceProp.escapedName);
            }