function reSort() {
            if (sortComparer) {
                sort(sortComparer, sortAsc);
            }
            else if (fastSortField) {
                fastSort(fastSortField, sortAsc);
            }
        }