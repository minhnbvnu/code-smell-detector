function keep_name(keep_setting, name) {
            return keep_setting === true
                || (keep_setting instanceof RegExp && keep_setting.test(name));
        }