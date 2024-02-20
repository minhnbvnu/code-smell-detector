function doneFn(results) {
    document.getElementById("results").innerHTML += "Done.<br/>";
    setTimeout(function () {
        sm.shutDown();
    }, 3000);

}