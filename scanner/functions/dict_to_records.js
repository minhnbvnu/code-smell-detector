function dict_to_records(data, index = true) {
        const records = [];
        for (let i = 0; i < data.index.length; i++) {
            const record = {};
            for (const col of data) {
                if (index || col !== "index")
                    record[col] = data[col][i];
            }
        }
        return records;
    }