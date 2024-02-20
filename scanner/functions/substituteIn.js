function substituteIn(template, json) {
        let output = template;
        for (const key in json) {
            if (typeof json[key] === 'object') {
                for (const subkey in json[key])
                    output = output.replace(`{${key}.${subkey}}`, json[key][subkey]);
            }
            output = output.replace(`{${key}}`, json[key]);
        }
        return output;
    }