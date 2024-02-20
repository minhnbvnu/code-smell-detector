function blurName(btn) {
    var status = btn.checked;
    if (status == true) {
        // If old style is present then first remove the old style
        var style = document.querySelector("#blur-names");
        console.log(style);
        if (style != null) {
            style.remove();
        }

        // Injecting style in head
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement("style");
        style.setAttribute("id", "blur-names");
        style.innerHTML = `
        ._3q9s6, ._21nHd, ._3WYXy, .hooVq, .zoWT4, ._2YPr_, .czcZD, ._ccCW { filter: blur(4px) !important; } ._3q9s6:hover, ._21nHd:hover, ._3WYXy:hover, .hooVq:hover, .zoWT4:hover, ._2YPr_:hover, .czcZD:hover, ._ccCW:hover { filter: blur(0) !important; }
        `;
        head.append(style);
    } else {
        var style = document.querySelector("#blur-names");
        style.remove();
    }
}