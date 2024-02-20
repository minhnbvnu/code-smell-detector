function getFilteredAndPagedItems(items) {
            if (filter) {
                var batchFilter = options.inlineFilters ? compiledFilter : uncompiledFilter;
                var batchFilterWithCaching = options.inlineFilters ? compiledFilterWithCaching : uncompiledFilterWithCaching;
                if (refreshHints.isFilterNarrowing) {
                    filteredItems = batchFilter(filteredItems, filterArgs);
                }
                else if (refreshHints.isFilterExpanding) {
                    filteredItems = batchFilterWithCaching(items, filterArgs, filterCache);
                }
                else if (!refreshHints.isFilterUnchanged) {
                    filteredItems = batchFilter(items, filterArgs);
                }
            }
            else {
                // special case:  if not filtering and not paging, the resulting
                // rows collection needs to be a copy so that changes due to sort
                // can be caught
                filteredItems = pagesize ? items : items.concat();
            }
            // get the current page
            var paged;
            if (pagesize) {
                if (filteredItems.length <= pagenum * pagesize) {
                    if (filteredItems.length === 0) {
                        pagenum = 0;
                    }
                    else {
                        pagenum = Math.floor((filteredItems.length - 1) / pagesize);
                    }
                }
                paged = filteredItems.slice(pagesize * pagenum, pagesize * pagenum + pagesize);
            }
            else {
                paged = filteredItems;
            }
            return { totalRows: filteredItems.length, rows: paged };
        }