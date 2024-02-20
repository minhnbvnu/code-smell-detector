function focusEl(idx) {
        document
            .querySelectorAll(".pg-suggestion")
            .forEach(each => each.classList.remove("autocomplete-active"))
        const focusedEl = document.querySelectorAll(".pg-suggestion")[idx]
        focusedEl?.classList.add("autocomplete-active")
        return focusedEl
    }