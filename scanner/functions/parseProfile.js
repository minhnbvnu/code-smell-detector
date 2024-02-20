function parseProfile(options) {
                var staticOptions = options.static;
                var dynamicOptions = options.dynamic;
                var profileEnable;
                if (S_PROFILE in staticOptions) {
                    var value = !!staticOptions[S_PROFILE];
                    profileEnable = createStaticDecl(function (env, scope) {
                        return value;
                    });
                    profileEnable.enable = value;
                }
                else if (S_PROFILE in dynamicOptions) {
                    var dyn = dynamicOptions[S_PROFILE];
                    profileEnable = createDynamicDecl(dyn, function (env, scope) {
                        return env.invoke(scope, dyn);
                    });
                }
                return profileEnable;
            }