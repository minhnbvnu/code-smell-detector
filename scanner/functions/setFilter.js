function setFilter(filterFn) {
            filter = filterFn;
            if (options.inlineFilters) {
                compiledFilter = compileFilter();
                compiledFilterWithCaching = compileFilterWithCaching();
            }
            refresh();
        }