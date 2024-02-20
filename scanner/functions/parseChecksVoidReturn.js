function parseChecksVoidReturn(checksVoidReturn) {
        var _a, _b, _c, _d, _e;
        switch (checksVoidReturn) {
            case false:
                return false;
            case true:
            case undefined:
                return {
                    arguments: true,
                    attributes: true,
                    properties: true,
                    returns: true,
                    variables: true,
                };
            default:
                return {
                    arguments: (_a = checksVoidReturn.arguments) !== null && _a !== void 0 ? _a : true,
                    attributes: (_b = checksVoidReturn.attributes) !== null && _b !== void 0 ? _b : true,
                    properties: (_c = checksVoidReturn.properties) !== null && _c !== void 0 ? _c : true,
                    returns: (_d = checksVoidReturn.returns) !== null && _d !== void 0 ? _d : true,
                    variables: (_e = checksVoidReturn.variables) !== null && _e !== void 0 ? _e : true,
                };
        }
    }