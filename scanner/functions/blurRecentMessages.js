function blurRecentMessages(btn) {
    var status = btn.checked;
    if (status == true) {
        // If old style is present then first remove the old style
        var style = document.querySelector("#blur-recent-messages");
        console.log(style);
        if (style != null) {
            style.remove();
        }

        // Injecting style in head
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement("style");
        style.setAttribute("id", "blur-recent-messages");
        style.innerHTML = `
            .Hy9nV { filter: blur(4px); } .Hy9nV:hover { filter: blur(0); }
        `;
        head.append(style);
    } else {
        var style = document.querySelector("#blur-recent-messages");
        style.remove();
    }
}