function flatten_var(name) {
            var redef = name.definition().redefined();
            if (redef) {
                name = name.clone();
                name.thedef = redef;
            }
            return name;
        }