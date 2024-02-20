function createElementFromHtml(html) {
        var dummy = document.createElement("div");
        dummy.innerHTML = html;
        return dummy.firstChild;
    }