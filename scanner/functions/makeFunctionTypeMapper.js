function makeFunctionTypeMapper(func, debugInfo) {
                return Debug.attachDebugPrototypeIfDebug({ kind: 3 /* Function */, func, debugInfo: Debug.isDebugging ? debugInfo : void 0 });
            }