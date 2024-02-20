function update_logo(value) {
    if (value) {
        document.getElementById("enabled-state").classList.remove("disabled");
        document.getElementById("enabled-state").innerText = "Enabled";

        document.getElementById("enabled-logo").style = "";
        document.getElementById("disabled-logo").style = "display:none";
    } else {
        document.getElementById("enabled-state").classList.add("disabled");
        document.getElementById("enabled-state").innerText = "Disabled";

        document.getElementById("enabled-logo").style = "display:none";
        document.getElementById("disabled-logo").style = "";
    }
}