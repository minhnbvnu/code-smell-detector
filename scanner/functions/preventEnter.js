function preventEnter(event) {
        if (
            event.key === "Enter" &&
            autocomplete &&
            document.querySelector(".autocomplete-active")
        ) {
            //textDiv.querySelector("button").disabled = true; // weird jerry rig to stop form from submitting
            event.preventDefault()
            event.stopPropagation()
            return false
        } else if ((event.key === "ArrowUp" || event.key === "ArrowDown") && autocomplete) {
            event.preventDefault()
            event.stopPropagation()
        }
    }