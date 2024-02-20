function addShadow() {
        if (textarea.value !== files[select.value]) {
            textarea.classList.add("changed")
        } else {
            textarea.classList.remove("changed")
        }
    }