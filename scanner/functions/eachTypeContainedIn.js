function eachTypeContainedIn(source, types) {
                return source.flags & 1048576 /* Union */ ? !forEach(source.types, (t) => !contains(types, t)) : contains(types, source);
            }