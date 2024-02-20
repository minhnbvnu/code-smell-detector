function PopOut_HideScrollers(panel) {
    if (panel && panel.style) {
        var up = WebForm_GetElementById(panel.id + "Up");
        var dn = WebForm_GetElementById(panel.id + "Dn");
        if (up) {
            up.style.visibility = "hidden";
            up.style.display = "none";
        }
        if (dn) {
            dn.style.visibility = "hidden";
            dn.style.display = "none";
        }
    }
}