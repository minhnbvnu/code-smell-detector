function adapter(column) {
                const { field: myField, formatter } = column;
                const aggregator = aggregators.find(({ field_ }) => field_ === myField);
                if (aggregator != null) {
                    const { key } = aggregator;
                    return {
                        formatter(row, cell, _value, columnDef, dataContext) {
                            return formatter != null ? formatter(row, cell, dataContext.totals[key][myField], columnDef, dataContext) : "";
                        },
                    };
                }
                return {};
            }