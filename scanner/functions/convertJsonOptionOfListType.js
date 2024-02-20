function convertJsonOptionOfListType(option, values, basePath, errors) {
            return filter(map(values, (v) => convertJsonOption(option.element, v, basePath, errors)), (v) => option.listPreserveFalsyValues ? true : !!v);
        }