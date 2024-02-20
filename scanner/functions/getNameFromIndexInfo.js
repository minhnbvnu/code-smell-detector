function getNameFromIndexInfo(info) {
            return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : void 0;
        }