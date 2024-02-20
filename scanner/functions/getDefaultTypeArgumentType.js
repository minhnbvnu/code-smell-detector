function getDefaultTypeArgumentType(isInJavaScriptFile) {
                return isInJavaScriptFile ? anyType : unknownType;
            }