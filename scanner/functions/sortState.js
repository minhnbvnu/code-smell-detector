function sortState(state) {
            return state.sort(function (a, b) {
                if (a === S_VIEWPORT) {
                    return -1;
                }
                else if (b === S_VIEWPORT) {
                    return 1;
                }
                return (a < b) ? -1 : 1;
            });
        }