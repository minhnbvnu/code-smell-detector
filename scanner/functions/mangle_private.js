function mangle_private(name) {
                let mangled = private_cache.get(name);
                if (!mangled) {
                    mangled = nth_identifier.get(++cprivate);
                    private_cache.set(name, mangled);
                }
                return mangled;
            }