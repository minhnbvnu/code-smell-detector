function handleFeature(btn) {
    var btnId = btn.id;

    if (btnId == "blurName") {
        blurName(btn);
    }

    if (btnId == "blurPhoto") {
        blurPhoto(btn);
    }

    if (btnId == "blurChat") {
        blurChat(btn);
    }

    if (btnId == "blurRecentMessages") {
        blurRecentMessages(btn);
    }

    if (btnId == "darkMode") {
        darkMode(btn);
    }
}