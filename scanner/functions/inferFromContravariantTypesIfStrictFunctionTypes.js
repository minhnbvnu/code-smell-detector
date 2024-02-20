function inferFromContravariantTypesIfStrictFunctionTypes(source, target) {
                    if (strictFunctionTypes || priority & 1024 /* AlwaysStrict */) {
                        inferFromContravariantTypes(source, target);
                    }
                    else {
                        inferFromTypes(source, target);
                    }
                }