function filterScrollLeft(val) {
            val = val | filterWidth;
            scrollLeft += val;
            scrollFilters();
        }