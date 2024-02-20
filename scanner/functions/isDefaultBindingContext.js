function isDefaultBindingContext(location) {
                return location.kind === 308 /* SourceFile */ || isAmbientModule(location);
            }