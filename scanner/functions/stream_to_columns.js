function stream_to_columns(data, new_data, rollover) {
        for (const [name, new_column] of (0, object_1.entries)(new_data)) {
            data[name] = stream_to_column(data[name], new_column, rollover);
        }
    }