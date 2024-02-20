function blurChat(btn) {
    var status = btn.checked;
    if (status == true) {
        // If old style is present then first remove the old style
        var style = document.querySelector("#blur-chats");
        console.log(style);
        if (style != null) {
            style.remove();
        }

        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement("style");
        style.setAttribute("id", "blur-chats");
        style.innerHTML = `
        .message-out, .message-in { filter: blur(4px); } .message-out:hover, .message-in:hover { filter: blur(0); }
        `;
        head.append(style);
    } else {
        var style = document.querySelector("#blur-chats");
        style.remove();
    }
}