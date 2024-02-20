function print_property_name(key, quote, output) {
                if (output.option("quote_keys")) {
                    return output.print_string(key);
                }
                if ("" + +key == key && key >= 0) {
                    if (output.option("keep_numbers")) {
                        return output.print(key);
                    }
                    return output.print(make_num(key));
                }
                var print_string = ALL_RESERVED_WORDS.has(key)
                    ? output.option("ie8")
                    : (output.option("ecma") < 2015 || output.option("safari10")
                        ? !is_basic_identifier_string(key)
                        : !is_identifier_string(key, true));
                if (print_string || (quote && output.option("keep_quoted_props"))) {
                    return output.print_string(key, quote);
                }
                return output.print_name(key);
            }