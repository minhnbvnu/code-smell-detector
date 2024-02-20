function makeRequire(context, moduleName) {
        var contextName = context.contextName,
            modRequire = makeContextModuleFunc(null, contextName, moduleName);

        req.mixin(modRequire, {
            //>>excludeStart("requireExcludeModify", pragmas.requireExcludeModify);
            modify: makeContextModuleFunc("modify", contextName, moduleName),
            //>>excludeEnd("requireExcludeModify");
            def: makeContextModuleFunc("def", contextName, moduleName),
            get: makeContextModuleFunc("get", contextName, moduleName),
            nameToUrl: makeContextModuleFunc("nameToUrl", contextName, moduleName),
            ready: req.ready,
            context: context,
            config: context.config,
            isBrowser: s.isBrowser
        });
        return modRequire;
    }