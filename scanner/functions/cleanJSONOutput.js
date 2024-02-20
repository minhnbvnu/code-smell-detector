function cleanJSONOutput (value, replacer, space) {
                return JSON.stringify(value, replacer, space).replaceAll('"', "'").replaceAll('\',\'', "', '");
            }