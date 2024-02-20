function createUnparsedSourceFile(textOrInputFiles, mapPathOrType, mapTextOrStripInternal) {
            let stripInternal;
            let bundleFileInfo;
            let fileName;
            let text;
            let length2;
            let sourceMapPath;
            let sourceMapText;
            let getText;
            let getSourceMapText;
            let oldFileOfCurrentEmit;
            if (!isString(textOrInputFiles)) {
                Debug.assert(mapPathOrType === "js" || mapPathOrType === "dts");
                fileName = (mapPathOrType === "js" ? textOrInputFiles.javascriptPath : textOrInputFiles.declarationPath) || "";
                sourceMapPath = mapPathOrType === "js" ? textOrInputFiles.javascriptMapPath : textOrInputFiles.declarationMapPath;
                getText = () => mapPathOrType === "js" ? textOrInputFiles.javascriptText : textOrInputFiles.declarationText;
                getSourceMapText = () => mapPathOrType === "js" ? textOrInputFiles.javascriptMapText : textOrInputFiles.declarationMapText;
                length2 = () => getText().length;
                if (textOrInputFiles.buildInfo && textOrInputFiles.buildInfo.bundle) {
                    Debug.assert(mapTextOrStripInternal === void 0 || typeof mapTextOrStripInternal === "boolean");
                    stripInternal = mapTextOrStripInternal;
                    bundleFileInfo = mapPathOrType === "js" ? textOrInputFiles.buildInfo.bundle.js : textOrInputFiles.buildInfo.bundle.dts;
                    oldFileOfCurrentEmit = textOrInputFiles.oldFileOfCurrentEmit;
                }
            }
            else {
                fileName = "";
                text = textOrInputFiles;
                length2 = textOrInputFiles.length;
                sourceMapPath = mapPathOrType;
                sourceMapText = mapTextOrStripInternal;
            }
            const node = oldFileOfCurrentEmit ? parseOldFileOfCurrentEmit(Debug.checkDefined(bundleFileInfo)) : parseUnparsedSourceFile(bundleFileInfo, stripInternal, length2);
            node.fileName = fileName;
            node.sourceMapPath = sourceMapPath;
            node.oldFileOfCurrentEmit = oldFileOfCurrentEmit;
            if (getText && getSourceMapText) {
                Object.defineProperty(node, "text", { get: getText });
                Object.defineProperty(node, "sourceMapText", { get: getSourceMapText });
            }
            else {
                Debug.assert(!oldFileOfCurrentEmit);
                node.text = text != null ? text : "";
                node.sourceMapText = sourceMapText;
            }
            return node;
        }