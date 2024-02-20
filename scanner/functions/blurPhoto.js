function blurPhoto(btn) {
    var status = btn.checked;
    if (status == true) {
        // If old style is present then first remove the old style
        var style = document.querySelector("#blur-photos");
        if (style != null) {
            style.remove();
        }

        // Injecting style in head
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement("style");
        style.setAttribute("id", "blur-photos");
        style.innerHTML = `
            ._8hzr9 { filter: blur(4px); } ._8hzr9:hover { filter: blur(0); }
        `;
        head.append(style);
    } else {
        var style = document.querySelector("#blur-photos");
        style.remove();
    }
}