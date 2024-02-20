function update_highlightimages(value) {
    var container = document.getElementById("highlightimages_container");

    if (value) {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }

    updateheight();
}