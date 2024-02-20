function find_group(key, value, records) {
        for (const record of records) {
            if (record[key] == value)
                return record;
        }
        return null;
    }