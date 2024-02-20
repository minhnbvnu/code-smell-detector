function parseCustomTypeOption(opt, value, errors) {
            return convertJsonOptionOfCustomType(opt, trimString(value || ""), errors);
        }