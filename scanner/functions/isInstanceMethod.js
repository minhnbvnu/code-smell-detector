function isInstanceMethod(node) {
                switch (node.type) {
                    case "MethodDefinition":
                        return !node.static && node.kind !== "constructor";
                    case "PropertyDefinition":
                        return !node.static && enforceForClassFields;
                    default:
                        return false;
                }
            }