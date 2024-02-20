function showMessage() {
    var x = document.getElementById("snackbar");
    if (x != null) {
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
    }
}