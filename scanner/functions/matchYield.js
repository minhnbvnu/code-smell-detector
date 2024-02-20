function matchYield() {
        return state.yieldAllowed && matchKeyword('yield', !strict);
    }