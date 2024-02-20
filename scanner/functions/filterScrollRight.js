function filterScrollRight(val) {
            val = val | filterWidth;
            scrollLeft -= val;
            scrollFilters();
        }