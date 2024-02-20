function replace_placeholders(content, data_source, i, formatters, special_vars = {}, encode) {
        let str;
        let has_html;
        if ((0, types_1.isString)(content)) {
            str = content;
            has_html = false;
        }
        else {
            str = content.html;
            has_html = true;
        }
        // this handles the special case @$name, replacing it with an @var corresponding to special_vars.name
        str = str.replace(/@\$name/g, (_match) => `@{${special_vars.name}}`);
        //
        // (?:\$\w+) - special vars: $x
        // (?:@\w+) - simple names: @foo
        // (?:@{(?:[^{}]+)})) - full names: @{one two}
        //
        // (?:{([^{}]+)})? - (optional) format for all of the above: @foo{fmt}
        //
        str = str.replace(/((?:\$\w+)|(?:@\w+)|(?:@{(?:[^{}]+)}))(?:{([^{}]+)})?/g, (_match, spec, format) => {
            const value = get_value(spec, data_source, i, special_vars);
            // missing value, return ???
            if (value == null)
                return encode != null ? encode("???") : "???";
            // 'safe' format, return the value as-is
            if (format == "safe") {
                has_html = true;
                return `${value}`;
            }
            // format and escape everything else
            const formatter = get_formatter(spec, format, formatters);
            const result = `${formatter(value, format, special_vars)}`;
            return encode != null ? encode(result) : result;
        });
        if (!has_html)
            return str;
        else {
            const parser = new DOMParser();
            const document = parser.parseFromString(str, "text/html");
            return [...document.body.childNodes];
        }
    }