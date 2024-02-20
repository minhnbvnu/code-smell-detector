function appendBlock(env, block) {
                    keys.forEach(function (key) {
                        var value = object[key];
                        if (!dynamic.isDynamic(value)) {
                            return;
                        }
                        var ref = env.invoke(block, value);
                        block(objectRef, '.', key, '=', ref, ';');
                    });
                }