function injectExtensions(env, scope) {
                if (extInstancing) {
                    env.instancing = scope.def(env.shared.extensions, '.angle_instanced_arrays');
                }
            }