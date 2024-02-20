function endsIn99 (val /* , path, parent, parentPropName */) {
            return Boolean((/\.99/u).test(val.toString()));
        }