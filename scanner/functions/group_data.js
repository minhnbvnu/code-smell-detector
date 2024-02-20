function group_data(records, columns, indexes, aggregators) {
        const grouped = [];
        const index_field = columns[0].field;
        for (const record of records) {
            const value = record[indexes[0]];
            let group = find_group(index_field, value, grouped);
            if (group == null) {
                group = { _children: [] };
                group[index_field] = value;
                grouped.push(group);
            }
            let subgroup = group;
            const groups = {};
            for (const index of indexes.slice(1)) {
                subgroup = find_group(index_field, record[index], subgroup._children);
                if (subgroup == null) {
                    subgroup = { _children: [] };
                    subgroup[index_field] = record[index];
                    group._children.push(subgroup);
                }
                groups[index] = group;
                for (const column of columns.slice(1))
                    subgroup[column.field] = record[column];
                group = subgroup;
            }
            for (const column of columns.slice(1))
                subgroup[column.field] = record[column.field];
        }
        const aggs = [];
        for (const index of indexes)
            aggs.push((index in aggregators) ? aggregators[index] : 'sum');
        summarize(grouped, columns, aggs);
        return grouped;
    }