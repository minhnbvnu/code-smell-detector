function updateheight() {
    setTimeout(function() {
        var html = document.getElementsByTagName("html")[0];
        html.style.height = document.body.scrollHeight + "px";
    }, 1);
}