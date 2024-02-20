function makeContextModuleFunc(name, contextName, moduleName) {
        return function () {
            //A version of a require function that forces a contextName value
            //and also passes a moduleName value for items that may need to
            //look up paths relative to the moduleName
            var args = [].concat(aps.call(arguments, 0));
            args.push(contextName, moduleName);
            return (name ? require[name] : require).apply(null, args);
        };
    }